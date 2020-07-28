"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceTableParser = void 0;
const GBXParser_1 = require("../GBXParser");
class ReferenceTableParser extends GBXParser_1.GBXParser {
    constructor(buffer, stringList = []) {
        super(buffer, stringList);
        this.buffer = buffer;
        this.stringList = stringList;
    }
    TMReferenceTable() {
        const r = {};
        r.numExternalNodes = this.buffer.readUInt32LE();
        if (r.numExternalNodes > 0) {
            throw new Error("External Nodes aren't supported yet.");
        }
        r.dataSize = this.buffer.readUInt32LE();
        r.compressedDataSize = this.buffer.readUInt32LE();
        return r;
    }
}
exports.ReferenceTableParser = ReferenceTableParser;
//# sourceMappingURL=ReferenceTableParser.js.map