"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBXBuffer = void 0;
const lzo = require("lzo");
const fs = require("fs");
class GBXBuffer {
    constructor(buffer) {
        this.buffer = buffer;
        this.currentOffset = 0;
    }
    readByte() {
        return this.readUInt8();
    }
    readBytes(numberOfBytes) {
        const value = this.buffer.slice(this.currentOffset, this.currentOffset + numberOfBytes);
        this.currentOffset += numberOfBytes;
        return value;
    }
    readUInt8() {
        const value = this.buffer.readUInt8(this.currentOffset);
        this.currentOffset++;
        return value;
    }
    readUInt32LE() {
        const value = this.buffer.readUInt32LE(this.currentOffset);
        this.currentOffset += 4;
        return value;
    }
    readUInt16LE() {
        const value = this.buffer.readUInt16LE(this.currentOffset);
        this.currentOffset += 2;
        return value;
    }
    readFloat() {
        const value = this.buffer.readFloatLE(this.currentOffset);
        this.currentOffset += 4;
        return value;
    }
    readString(length) {
        const value = this.buffer.toString("utf8", this.currentOffset, this.currentOffset + length);
        this.currentOffset += length;
        return value;
    }
    skip(numberOfBytes) {
        this.currentOffset += numberOfBytes;
    }
    decompress(compressedSize, decompressedSize) {
        const lzoCompressedData = this.buffer.slice(this.currentOffset, this.currentOffset + compressedSize);
        const decompressedBuffer = lzo.decompress(lzoCompressedData, decompressedSize);
        this.currentOffset += compressedSize;
        fs.writeFileSync("./output.gbx", decompressedBuffer);
        const gbxBuffer = new GBXBuffer(decompressedBuffer);
        // TODO Check for errors
        return gbxBuffer;
    }
    seekFacade() {
        for (let i = 0; i < this.buffer.length - 4; i++) {
            if (this.buffer.slice(this.currentOffset).readUInt32LE(i) ===
                0xfacade01) {
                return i;
            }
        }
    }
    skipToFacade() {
        this.skip(this.seekFacade());
    }
    get length() {
        return this.buffer.length;
    }
    get nativeBuffer() {
        return this.buffer;
    }
}
exports.GBXBuffer = GBXBuffer;
//# sourceMappingURL=GBXBuffer.js.map