import { Statistics, SummaryOffset } from ".";
import { BufferBuilder } from "./BufferBuilder";
import { MCAP0_MAGIC, Opcode } from "./constants";
import {
  ChannelInfo,
  Header,
  Footer,
  Message,
  Attachment,
  AttachmentIndex,
  Chunk,
  ChunkIndex,
  MessageIndex,
  Metadata,
  MetadataIndex,
  DataEnd,
} from "./types";

type Options = {
  /** Add an unspecified number of extra padding bytes at the end of each record */
  padRecords: boolean;
};

/**
 * Mcap0RecordBuilder provides methods to serialize mcap records to a buffer in memory.
 *
 * It makes no effort to ensure spec compatibility on the order of records, this is the responsibility
 * of the caller.
 *
 * You'll likely want to use one of the higher level writer interfaces unless you are building your
 * own higher level writing interface.
 */
export class Mcap0RecordBuilder {
  private bufferBuilder = new BufferBuilder();

  constructor(private options?: Options) {}

  get length(): number {
    return this.bufferBuilder.length;
  }

  get buffer(): Uint8Array {
    return this.bufferBuilder.buffer;
  }

  reset(): void {
    this.bufferBuilder.reset();
  }

  writeMagic(): void {
    this.bufferBuilder.bytes(new Uint8Array(MCAP0_MAGIC));
  }

  writeHeader(header: Header): bigint {
    this.bufferBuilder.uint8(Opcode.HEADER);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder size
      .string(header.profile)
      .string(header.library);

    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeFooter(footer: Footer): bigint {
    this.bufferBuilder
      .uint8(Opcode.FOOTER)
      .uint64(20n) // footer is fixed length
      .uint64(footer.summaryStart)
      .uint64(footer.summaryOffsetStart)
      .uint32(footer.crc);
    // footer record cannot be padded
    return 20n;
  }

  writeChannelInfo(info: ChannelInfo): bigint {
    this.bufferBuilder.uint8(Opcode.CHANNEL_INFO);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder
      .uint16(info.channelId)
      .string(info.topicName)
      .string(info.messageEncoding)
      .string(info.schemaEncoding)
      .string(info.schema)
      .string(info.schemaName)
      .tupleArray(
        (key) => this.bufferBuilder.string(key),
        (value) => this.bufferBuilder.string(value),
        info.userData,
      );
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }
    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeMessage(message: Message): void {
    this.bufferBuilder.uint8(Opcode.MESSAGE);
    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder
      .uint16(message.channelId)
      .uint32(message.sequence)
      .uint64(message.publishTime)
      .uint64(message.recordTime)
      .bytes(message.messageData);
    // message record cannot be padded
    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);
  }

  writeAttachment(attachment: Attachment): bigint {
    this.bufferBuilder.uint8(Opcode.ATTACHMENT);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder
      .string(attachment.name)
      .uint64(attachment.createdAt)
      .uint64(attachment.recordTime)
      .string(attachment.contentType)
      .uint64(BigInt(attachment.data.byteLength))
      .bytes(attachment.data)
      .uint32(0 /*crc*/);
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeAttachmentIndex(attachmentIndex: AttachmentIndex): bigint {
    this.bufferBuilder.uint8(Opcode.ATTACHMENT_INDEX);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder
      .uint64(attachmentIndex.offset)
      .uint64(attachmentIndex.attachmentRecordLength)
      .uint64(attachmentIndex.recordTime)
      .uint64(attachmentIndex.attachmentSize)
      .string(attachmentIndex.name)
      .string(attachmentIndex.contentType);
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeChunk(chunk: Chunk): bigint {
    this.bufferBuilder.uint8(Opcode.CHUNK);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder
      .uint64(chunk.startTime)
      .uint64(chunk.endTime)
      .uint64(chunk.uncompressedSize)
      .uint32(chunk.uncompressedCrc)
      .string(chunk.compression)
      .bytes(chunk.records);
    // chunk record cannot be padded
    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition - 1);
  }

  writeChunkIndex(chunkIndex: ChunkIndex): bigint {
    this.bufferBuilder.uint8(Opcode.CHUNK_INDEX);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder
      .uint64(chunkIndex.startTime)
      .uint64(chunkIndex.endTime)
      .uint64(chunkIndex.chunkStart)
      .uint64(chunkIndex.chunkLength)
      .uint32(chunkIndex.messageIndexOffsets.size * 10);

    for (const [channelId, offset] of chunkIndex.messageIndexOffsets) {
      this.bufferBuilder.uint16(channelId).uint64(offset);
    }

    this.bufferBuilder
      .uint64(chunkIndex.messageIndexLength)
      .string(chunkIndex.compression)
      .uint64(chunkIndex.compressedSize)
      .uint64(chunkIndex.uncompressedSize)
      .uint32(0);
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeMessageIndex(messageIndex: MessageIndex): bigint {
    this.bufferBuilder.uint8(Opcode.MESSAGE_INDEX);
    const startPosition = this.bufferBuilder.length;

    // each records tuple is a fixed byte length
    const messageIndexRecordsByteLength = messageIndex.records.length * 16;

    this.bufferBuilder
      .uint64(0n) // placeholder
      .uint16(messageIndex.channelId)
      .uint32(messageIndexRecordsByteLength);

    for (const record of messageIndex.records) {
      this.bufferBuilder.uint64(record[0]).uint64(record[1]);
    }
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);
    return BigInt(endPosition - startPosition + 1);
  }

  writeMetadata(metadata: Metadata): bigint {
    this.bufferBuilder.uint8(Opcode.METADATA);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder size
      .string(metadata.name)
      .tupleArray(
        (key) => this.bufferBuilder.string(key),
        (value) => this.bufferBuilder.string(value),
        metadata.metadata,
      );
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeMetadataIndex(metadataIndex: MetadataIndex): bigint {
    this.bufferBuilder.uint8(Opcode.METADATA_INDEX);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder size
      .uint64(metadataIndex.offset)
      .uint64(metadataIndex.length)
      .string(metadataIndex.name);
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeSummaryOffset(summaryOffset: SummaryOffset): bigint {
    this.bufferBuilder.uint8(Opcode.SUMMARY_OFFSET);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder size
      .uint8(summaryOffset.groupOpcode)
      .uint64(summaryOffset.groupStart)
      .uint64(summaryOffset.groupLength);
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeStatistics(statistics: Statistics): bigint {
    this.bufferBuilder.uint8(Opcode.STATISTICS);

    const startPosition = this.bufferBuilder.length;

    this.bufferBuilder
      .uint64(0n) // placeholder size
      .uint64(statistics.messageCount)
      .uint32(statistics.channelCount)
      .uint32(statistics.attachmentCount)
      .uint32(statistics.chunkCount)
      .tupleArray(
        (key) => this.bufferBuilder.uint16(key),
        (value) => this.bufferBuilder.uint64(value),
        statistics.channelMessageCounts.entries(),
      );
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }

  writeDataEnd(dataEnd: DataEnd): bigint {
    this.bufferBuilder.uint8(Opcode.DATA_END);

    const startPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .uint64(0n) // placeholder size
      .uint32(dataEnd.dataSectionCrc);
    if (this.options?.padRecords === true) {
      this.bufferBuilder.uint8(0x01).uint8(0xff).uint8(0xff);
    }

    const endPosition = this.bufferBuilder.length;
    this.bufferBuilder
      .seek(startPosition)
      .uint64(BigInt(endPosition - startPosition - 8))
      .seek(endPosition);

    return BigInt(endPosition - startPosition + 1);
  }
}