"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readString = void 0;
function readString(buffer, offset = 0) {
    let strLength = buffer.readUInt32LE(offset);
    offset += 4;
    if (strLength > 100000) {
        throw new Error('LookBackString: value of strLength is way too big');
    }
    return {
        str: buffer.toString('utf8', offset, offset + strLength),
        strLength,
        newOffset: offset + strLength,
    };
}
exports.readString = readString;
//# sourceMappingURL=readString.js.map