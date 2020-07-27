"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBXBuffer = void 0;
class GBXBuffer {
    constructor(buffer) {
        this.buffer = buffer;
        this.memory = {};
        this.currentOffset = 0;
    }
    readUInt32LE(key) {
        const value = this.buffer.readUInt32LE(this.currentOffset);
        this.memory[key] = value;
        this.currentOffset += 4;
        return value;
    }
    readString(key, length) {
        const value = this.buffer.toString('utf8', this.currentOffset, this.currentOffset + length);
        this.memory[key] = value;
        this.currentOffset += length;
        return value;
    }
}
exports.GBXBuffer = GBXBuffer;
//# sourceMappingURL=GBXBuffer.js.map