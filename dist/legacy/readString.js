"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readStringBuffer = exports.readString = void 0;
const binary_parser_1 = require("binary-parser");
exports.readString = new binary_parser_1.Parser()
    .endianess("little")
    .uint32("strLength")
    .string("str", { length: "strLength" });
function readStringBuffer(buffer, offset = 0) {
    let strLength = buffer.readUInt32LE(offset);
    offset += 4;
    if (strLength > 100000) {
        throw new Error("LookBackString: value of strLength is way too big");
    }
    return {
        str: buffer.toString("utf8", offset, offset + strLength),
        strLength,
        newOffset: offset + strLength,
    };
}
exports.readStringBuffer = readStringBuffer;
//# sourceMappingURL=readString.js.map