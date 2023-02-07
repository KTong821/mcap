// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { PackedElementField } from '../foxglove/packed-element-field';
import { Pose } from '../foxglove/pose';
import { Time } from '../foxglove/time';
import { Vector2 } from '../foxglove/vector2';


/**
 * A 2D grid of data
 */
export class Grid {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Grid {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsGrid(bb:flatbuffers.ByteBuffer, obj?:Grid):Grid {
  return (obj || new Grid()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsGrid(bb:flatbuffers.ByteBuffer, obj?:Grid):Grid {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new Grid()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

/**
 * Timestamp of grid
 */
timestamp(obj?:Time):Time|null {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? (obj || new Time()).__init(this.bb_pos + offset, this.bb!) : null;
}

/**
 * Frame of reference
 */
frameId():string|null
frameId(optionalEncoding:flatbuffers.Encoding):string|Uint8Array|null
frameId(optionalEncoding?:any):string|Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
}

/**
 * Origin of grid's corner relative to frame of reference; grid is positioned in the x-y plane relative to this origin
 */
pose(obj?:Pose):Pose|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? (obj || new Pose()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

/**
 * Number of grid columns
 */
columnCount():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

/**
 * Size of single grid cell along x and y axes, relative to `pose`
 */
cellSize(obj?:Vector2):Vector2|null {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? (obj || new Vector2()).__init(this.bb!.__indirect(this.bb_pos + offset), this.bb!) : null;
}

/**
 * Number of bytes between rows in `data`
 */
rowStride():number {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

/**
 * Number of bytes between cells within a row in `data`
 */
cellStride():number {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

/**
 * Fields in `data`
 */
fields(index: number, obj?:PackedElementField):PackedElementField|null {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? (obj || new PackedElementField()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

fieldsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

/**
 * Grid cell data, interpreted using `fields`, in row-major (y-major) order
 */
data(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.readUint8(this.bb!.__vector(this.bb_pos + offset) + index) : 0;
}

dataLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

dataArray():Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 20);
  return offset ? new Uint8Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

static startGrid(builder:flatbuffers.Builder) {
  builder.startObject(9);
}

static addTimestamp(builder:flatbuffers.Builder, timestampOffset:flatbuffers.Offset) {
  builder.addFieldStruct(0, timestampOffset, 0);
}

static addFrameId(builder:flatbuffers.Builder, frameIdOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, frameIdOffset, 0);
}

static addPose(builder:flatbuffers.Builder, poseOffset:flatbuffers.Offset) {
  builder.addFieldOffset(2, poseOffset, 0);
}

static addColumnCount(builder:flatbuffers.Builder, columnCount:number) {
  builder.addFieldInt32(3, columnCount, 0);
}

static addCellSize(builder:flatbuffers.Builder, cellSizeOffset:flatbuffers.Offset) {
  builder.addFieldOffset(4, cellSizeOffset, 0);
}

static addRowStride(builder:flatbuffers.Builder, rowStride:number) {
  builder.addFieldInt32(5, rowStride, 0);
}

static addCellStride(builder:flatbuffers.Builder, cellStride:number) {
  builder.addFieldInt32(6, cellStride, 0);
}

static addFields(builder:flatbuffers.Builder, fieldsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(7, fieldsOffset, 0);
}

static createFieldsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startFieldsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static addData(builder:flatbuffers.Builder, dataOffset:flatbuffers.Offset) {
  builder.addFieldOffset(8, dataOffset, 0);
}

static createDataVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset {
  builder.startVector(1, data.length, 1);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]!);
  }
  return builder.endVector();
}

static startDataVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(1, numElems, 1);
}

static endGrid(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static finishGridBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset);
}

static finishSizePrefixedGridBuffer(builder:flatbuffers.Builder, offset:flatbuffers.Offset) {
  builder.finish(offset, undefined, true);
}

}