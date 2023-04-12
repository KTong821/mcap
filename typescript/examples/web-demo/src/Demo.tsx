// cspell:word millis

import { fromMillis, fromNanoSec } from "@foxglove/rostime";
import { PoseInFrame, CompressedImage } from "@foxglove/schemas";
import {
  PoseInFrame as PoseInFrameSchema,
  CompressedImage as CompressedImageSchema,
} from "@foxglove/schemas/jsonschema";
import zstd from "@foxglove/wasm-zstd";
import { McapWriter } from "@mcap/core";
import { Circle, Download } from "@mui/icons-material";
import { Button, CircularProgress, FormControlLabel, Switch, Typography } from "@mui/material";
import { EventEmitter } from "eventemitter3";
import { Base64 } from "js-base64";
import Queue from "promise-queue";
import { useCallback, useEffect, useRef, useState } from "react";
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
  #poseChannelId?: Promise<number>;
  #poseChannelSeq = 0;
  #cameraChannelId?: Promise<number>;
  #cameraChannelSeq = 0;

  #blobParts: Uint8Array[] = [];
  bytesWritten = 0n;
  messageCount = 0;

  constructor() {
    super();
    this.#reinitializeWriter();
  }

  #reinitializeWriter() {
    const promise = this.#queue.add(async () => {
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
      await this.#writer.start({ library: "@foxglove/mcap-web-demo", profile: "" });

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

      const poseSchemaId = await this.#writer.registerSchema({
        name: PoseInFrameSchema.title,
        encoding: "jsonschema",
        data: this.#textEncoder.encode(JSON.stringify(PoseInFrameSchema)),
      });
      const poseChannelId = await this.#writer.registerChannel({
        topic: "pose",
        messageEncoding: "json",
        schemaId: poseSchemaId,
        metadata: new Map(),
      });

      const cameraSchemaId = await this.#writer.registerSchema({
        name: CompressedImageSchema.title,
        encoding: "jsonschema",
        data: this.#textEncoder.encode(JSON.stringify(CompressedImageSchema)),
      });
      const cameraChannelId = await this.#writer.registerChannel({
        topic: "camera",
        messageEncoding: "json",
        schemaId: cameraSchemaId,
        metadata: new Map(),
      });

      this.#emit();
      return { mouseChannelId, poseChannelId, cameraChannelId };
    });
    this.#mouseChannelId = promise.then(({ mouseChannelId }) => mouseChannelId);
    this.#poseChannelId = promise.then(({ poseChannelId }) => poseChannelId);
    this.#cameraChannelId = promise.then(({ cameraChannelId }) => cameraChannelId);
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

  async addPose(msg: PoseInFrame): Promise<void> {
    void this.#queue.add(async () => {
      if (!this.#writer || !this.#poseChannelId) {
        return;
      }
      const now = this.#time();
      await this.#writer.addMessage({
        sequence: this.#poseChannelSeq++,
        channelId: await this.#poseChannelId,
        logTime: now,
        publishTime: now,
        data: this.#textEncoder.encode(JSON.stringify(msg)),
      });
      this.messageCount++;
      this.#emit();
    });
  }

  async addCameraImage(blob: Blob): Promise<void> {
    void this.#queue.add(async () => {
      if (!this.#writer || !this.#cameraChannelId) {
        return;
      }
      const now = this.#time();
      const msg: Omit<CompressedImage, "data"> & { data: string } = {
        timestamp: fromNanoSec(now),
        frame_id: "camera",
        data: Base64.fromUint8Array(new Uint8Array(await blob.arrayBuffer())),
        format: blob.type,
      };
      this.messageCount++;
      this.#emit();
      await this.#writer.addMessage({
        sequence: this.#cameraChannelSeq++,
        channelId: await this.#cameraChannelId,
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

  latestMessage: MouseEventMessage | PoseInFrame | undefined;

  addMouseEventMessage: (msg: MouseEventMessage) => void;
  addPoseMessage: (msg: PoseInFrame) => void;
  addCameraImage: (blob: Blob) => void;
  closeAndRestart: () => Promise<Blob>;
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
    addMouseEventMessage(msg: MouseEventMessage) {
      void recorder.addMouseEvent(msg);
      set({ latestMessage: msg });
    },
    addPoseMessage(msg: PoseInFrame) {
      void recorder.addPose(msg);
      set({ latestMessage: msg });
    },
    addCameraImage(blob: Blob) {
      void recorder.addCameraImage(blob);
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

const RADIANS_PER_DEGREE = Math.PI / 180;

// Adapted from https://github.com/mrdoob/three.js/blob/master/src/math/Quaternion.js
function deviceOrientationToPose(event: DeviceOrientationEvent): PoseInFrame {
  const alpha = (event.alpha ?? 0) * RADIANS_PER_DEGREE; // z angle
  const beta = (event.beta ?? 0) * RADIANS_PER_DEGREE; // x angle
  const gamma = (event.gamma ?? 0) * RADIANS_PER_DEGREE; // y angle

  const c1 = Math.cos(beta / 2);
  const c2 = Math.cos(gamma / 2);
  const c3 = Math.cos(alpha / 2);

  const s1 = Math.sin(beta / 2);
  const s2 = Math.sin(gamma / 2);
  const s3 = Math.sin(alpha / 2);

  const x = s1 * c2 * c3 - c1 * s2 * s3;
  const y = c1 * s2 * c3 + s1 * c2 * s3;
  const z = c1 * c2 * s3 + s1 * s2 * c3;
  const w = c1 * c2 * c3 - s1 * s2 * s3;

  return {
    timestamp: fromMillis(event.timeStamp),
    frame_id: "device",
    pose: { position: { x: 0, y: 0, z: 0 }, orientation: { x, y, z, w } },
  };
}

const hasMouse = window.matchMedia("(hover: hover)").matches;

export function Demo(): JSX.Element {
  const container = useRef<HTMLDivElement>(null);
  const state = useStore();

  // Automatically start recording if we believe the device has a mouse (which means it is likely
  // not to support orientation events)
  const [recording, setRecording] = useState(hasMouse);
  const [orientationPermissionError, setOrientationPermissionError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [recordingVideo, setRecordingVideo] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const [videoPermissionError, setVideoPermissionError] = useState(false);

  const { addCameraImage, addMouseEventMessage, addPoseMessage } = state;

  useEffect(() => {
    if (!recording) {
      return;
    }

    const handleMouseEvent = (event: MouseEvent) => {
      addMouseEventMessage({ clientX: event.clientX, clientY: event.clientY });
    };
    const handleDeviceOrientationEvent = (event: DeviceOrientationEvent) => {
      addPoseMessage(deviceOrientationToPose(event));
    };
    window.addEventListener("pointermove", handleMouseEvent);
    window.addEventListener("deviceorientation", handleDeviceOrientationEvent);
    return () => {
      window.removeEventListener("pointermove", handleMouseEvent);
      window.removeEventListener("deviceorientation", handleDeviceOrientationEvent);
    };
  }, [addMouseEventMessage, addPoseMessage, recording]);

  useEffect(() => {
    const video = videoRef.current;
    if (!recordingVideo || !video) {
      return;
    }
    const controller = new AbortController();
    void (async (signal: AbortSignal) => {
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        setVideoPermissionError(true);
        return;
      }
      if (signal.aborted) {
        return;
      }
      video.srcObject = stream;
      try {
        await video.play();
      } catch (error) {
        // Interrupted: https://developer.chrome.com/blog/play-request-was-interrupted/
        console.error(error);
        return;
      }

      if (!signal.aborted) {
        setVideoStarted(true);
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      let framePromise: Promise<void> | undefined;
      const frameDurationSec = 1 / 30;
      const interval = setInterval(() => {
        if (framePromise) {
          // last frame is not yet complete, skip frame
          return;
        }
        framePromise = new Promise((resolve) => {
          ctx?.drawImage(video, 0, 0);
          canvas.toBlob(
            (blob) => {
              if (blob && !signal.aborted) {
                addCameraImage(blob);
              }
              resolve();
              framePromise = undefined;
            },
            "image/jpeg",
            0.8,
          );
        });
      }, frameDurationSec * 1000);

      const cleanup = () => {
        clearInterval(interval);
        for (const track of stream.getTracks()) {
          track.stop();
        }
      };
      if (signal.aborted) {
        cleanup();
      } else {
        signal.addEventListener("abort", cleanup);
      }
    })(controller.signal);

    return () => {
      controller.abort();
    };
  }, [addCameraImage, recordingVideo]);

  const onStartRecording = useCallback(async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      "requestPermission" in DeviceOrientationEvent &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const result: unknown = await DeviceOrientationEvent.requestPermission();
      if (result !== "granted") {
        setOrientationPermissionError(true);
      }
    }
    // Even if a permission error was encountered, we can record pointer events
    setRecording(true);
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
      URL.revokeObjectURL(url);
    })();
  }, [state]);

  return (
    <div ref={container}>
      <FormControlLabel
        control={
          <Switch
            checked={recordingVideo}
            onChange={(_event, checked) => {
              setVideoStarted(false);
              setRecordingVideo(checked);
            }}
          />
        }
        label="Camera"
      />
      {recordingVideo && !videoPermissionError && (
        <div style={{ width: 150, height: 100, position: "relative" }}>
          <video ref={videoRef} style={{ width: "100%", height: "100%" }} />
          {!videoStarted && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%,-50%)`,
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      )}
      <Typography>Messages: {state.messageCount}</Typography>
      {state.latestMessage && "clientX" in state.latestMessage && (
        <>
          <Typography fontWeight="bold">Mouse</Typography>
          <Typography>clientX: {state.latestMessage.clientX}</Typography>
          <Typography>clientY: {state.latestMessage.clientY}</Typography>
        </>
      )}
      {state.latestMessage && "frame_id" in state.latestMessage && (
        <>
          <Typography fontWeight="bold">Pose</Typography>
          <Typography>x: {state.latestMessage.pose.orientation.x.toFixed(3)}</Typography>
          <Typography>y: {state.latestMessage.pose.orientation.y.toFixed(3)}</Typography>
          <Typography>z: {state.latestMessage.pose.orientation.z.toFixed(3)}</Typography>
          <Typography>w: {state.latestMessage.pose.orientation.w.toFixed(3)}</Typography>
        </>
      )}
      {recording ? (
        <Button variant="contained" onClick={onDownloadClick} startIcon={<Download />}>
          Download ({formatBytes(Number(state.bytesWritten))})
        </Button>
      ) : (
        <Button
          variant="contained"
          color="error"
          onClick={() => void onStartRecording()}
          startIcon={<Circle />}
        >
          Record
        </Button>
      )}
      {orientationPermissionError && (
        <Typography component="div" variant="caption" color="error">
          Allow permission to use device orientation
        </Typography>
      )}
      {videoPermissionError && (
        <Typography component="div" variant="caption" color="error">
          Allow permission to record camera images
        </Typography>
      )}
    </div>
  );
}
