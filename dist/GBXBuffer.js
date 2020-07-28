"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBXBuffer = void 0;
class GBXBuffer {
    constructor(buffer) {
        this.buffer = buffer;
        this.currentOffset = 0;
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
    readString(length) {
        const value = this.buffer.toString('utf8', this.currentOffset, this.currentOffset + length);
        this.currentOffset += length;
        return value;
    }
    skip(numberOfBytes) {
        this.currentOffset += numberOfBytes;
    }
}
exports.GBXBuffer = GBXBuffer;
//# sourceMappingURL=GBXBuffer.js.map