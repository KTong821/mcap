import zstd from "@foxglove/wasm-zstd";
import { McapWriter } from "@mcap/core";
import { Button, Typography } from "@mui/material";
import { EventEmitter } from "eventemitter3";
import Queue from "promise-queue";
import { useCallback, useEffect, useRef } from "react";
import { create } from "zustand";

type RecorderEvents = {
  update: () => void;
};

type MouseEventMessage = {
  clientX: number;
  clientY: number;
};

const MouseEventSchema = {
  type: "object",
  properties: {
    clientX: { type: "number" },
    clientY: { type: "number" },
  },
};

class Recorder extends EventEmitter<RecorderEvents> {
  #textEncoder = new TextEncoder();
  #writer?: McapWriter;
  /** Used to ensure all operations on the McapWriter are sequential */
  #queue = new Queue(/*maxPendingPromises=*/ 1);
  #mouseChannelId?: Promise<number>;
  #mouseChannelSeq = 0;

  #blobParts: Uint8Array[] = [];
  bytesWritten = 0n;
  messageCount = 0;

  constructor() {
    super();
    this.#reinitializeWriter();
  }

  #reinitializeWriter() {
    this.#mouseChannelId = this.#queue.add(async () => {
      await zstd.isLoaded;
      this.#blobParts = [];
      this.bytesWritten = 0n;
      this.messageCount = 0;
      this.#writer = new McapWriter({
        chunkSize: 1024,
        compressChunk(data) {
          return { compression: "zstd", compressedData: zstd.compress(data) };
        },
        writable: {
          position: () => this.bytesWritten,
          write: async (buffer: Uint8Array) => {
            this.#blobParts.push(buffer);
            this.bytesWritten += BigInt(buffer.byteLength);
            this.#emit();
          },
        },
      });
      await this.#writer.start({ library: "", profile: "" });
      const mouseSchemaId = await this.#writer.registerSchema({
        name: "MouseEvent",
        encoding: "jsonschema",
        data: this.#textEncoder.encode(JSON.stringify(MouseEventSchema)),
      });
      const mouseChannelId = await this.#writer.registerChannel({
        topic: "mouse",
        messageEncoding: "json",
        schemaId: mouseSchemaId,
        metadata: new Map(),
      });
      this.#emit();
      return mouseChannelId;
    });
  }

  #time(): bigint {
    const milliseconds = +new Date();
    return BigInt(milliseconds) * 1_000_000n;
  }

  #emit() {
    this.emit("update");
  }

  async addMouseEvent(msg: MouseEventMessage): Promise<void> {
    void this.#queue.add(async () => {
      if (!this.#writer || !this.#mouseChannelId) {
        return;
      }
      const now = this.#time();
      await this.#writer.addMessage({
        sequence: this.#mouseChannelSeq++,
        channelId: await this.#mouseChannelId,
        logTime: now,
        publishTime: now,
        data: this.#textEncoder.encode(JSON.stringify(msg)),
      });
      this.messageCount++;
      this.#emit();
    });
  }

  async closeAndRestart(): Promise<Blob> {
    return await this.#queue.add(async () => {
      await this.#writer?.end();
      const blob = new Blob(this.#blobParts);
      this.#reinitializeWriter();
      return blob;
    });
  }
}

type State = {
  bytesWritten: bigint;
  messageCount: number;

  latestMessage: MouseEventMessage | undefined;

  addMouseEvent(msg: MouseEventMessage): void;
  closeAndRestart(): Promise<Blob>;
};

const useStore = create<State>((set) => {
  const recorder = new Recorder();
  recorder.addListener("update", () => {
    set({
      bytesWritten: recorder.bytesWritten,
      messageCount: recorder.messageCount,
    });
  });

  return {
    bytesWritten: recorder.bytesWritten,
    messageCount: recorder.messageCount,
    latestMessage: undefined,
    addMouseEvent(msg: MouseEventMessage) {
      void recorder.addMouseEvent(msg);
      set({ latestMessage: msg });
    },
    async closeAndRestart() {
      return await recorder.closeAndRestart();
    },
  };
});

function formatBytes(totalBytes: number) {
  const units = ["B", "kiB", "MiB", "GiB", "TiB"];
  let bytes = totalBytes;
  let unit = 0;
  while (unit + 1 < units.length && bytes >= 1024) {
    bytes /= 1024;
    unit++;
  }
  return `${bytes.toFixed(2)} ${units[unit]!}`;
}

export function Demo(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const state = useStore();

  useEffect(() => {
    const handleMouseEvent = (event: MouseEvent) => {
      state.addMouseEvent({ clientX: event.clientX, clientY: event.clientY });
    };
    document.addEventListener("mousemove", handleMouseEvent);
    return () => {
      document.removeEventListener("mousemove", handleMouseEvent);
    };
  }, []);

  const onDownloadClick = useCallback(() => {
    void (async () => {
      const blob = await state.closeAndRestart();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "demo.mcap";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // URL.revokeObjectURL(url);
    })();
  }, []);

  return (
    <div ref={container}>
      <Typography variant="body1">Messages: {state.messageCount}</Typography>
      {state.latestMessage && (
        <>
          <Typography variant="body1">clientX: {state.latestMessage.clientX}</Typography>
          <Typography variant="body1">clientY: {state.latestMessage.clientY}</Typography>
        </>
      )}
      <Button variant="contained" onClick={onDownloadClick}>
        Download ({formatBytes(Number(state.bytesWritten))})
      </Button>
    </div>
  );
}
