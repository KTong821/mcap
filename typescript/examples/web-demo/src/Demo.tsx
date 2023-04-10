import { useEffect, useRef, useState } from "react";
import { IWritable, McapWriter } from "@mcap/core";
import zstd from "@foxglove/wasm-zstd";
import { EventEmitter } from "eventemitter3";
import Queue from "promise-queue";
import { create, createStore } from "zustand";

// type RecordingButtonProps = {
//   state: "idle"|"recording";
// }
// function RecordingButton(props:RecordingButtonProps): JSX.Element {

// }

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
  #writer: McapWriter;
  /** Used to ensure all operations on the McapWriter are sequential */
  #queue = new Queue(/*maxPendingPromises=*/ 1);
  #mouseChannelId: Promise<number>;
  #mouseChannelSeq = 0;

  bytesWritten = 0n;
  messageCount = 0;

  constructor() {
    super();
    this.#queue.add(() => zstd.isLoaded);
    this.#writer = new McapWriter({
      compressChunk(data) {
        return { compression: "zstd", compressedData: zstd.compress(data) };
      },
      writable: {
        position: () => this.bytesWritten,
        write: async (buffer: Uint8Array) => {
          this.bytesWritten += BigInt(buffer.byteLength);
        },
      },
    });

    this.#mouseChannelId = this.#queue.add(async () => {
      const schemaId = await this.#writer.registerSchema({
        name: "MouseEvent",
        encoding: "json",
        data: this.#textEncoder.encode(JSON.stringify(MouseEventSchema)),
      });
      const channelId = await this.#writer.registerChannel({
        topic: "mouse",
        messageEncoding: "json",
        schemaId: schemaId,
        metadata: new Map(),
      });
      return channelId;
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
    this.#queue.add(async () => {
      const now = this.#time();
      this.#writer.addMessage({
        sequence: this.#mouseChannelSeq++,
        channelId: await this.#mouseChannelId,
        logTime: now,
        publishTime: now,
        data: this.#textEncoder.encode(JSON.stringify(msg)),
      });
      this.#emit();
    });
  }
}

type State = {
  bytesWritten: bigint;
  messageCount: number;

  addMouseEvent(msg: MouseEventMessage): void;
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
    addMouseEvent(msg: MouseEventMessage) {
      void recorder.addMouseEvent(msg);
    },
  };
});

export function Demo() {
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

  return <div ref={container}>Messages: {state.messageCount}</div>;
}
