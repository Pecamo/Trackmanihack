"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderParser = void 0;
const GBXParser_1 = require("../GBXParser");
class HeaderParser extends GBXParser_1.GBXParser {
    constructor(buffer, stringList = []) {
        super(buffer, stringList);
        this.buffer = buffer;
        this.stringList = stringList;
    }
    TMHeader() {
        const r = {};
        r.magic = this.buffer.readString(3);
        r.version = this.buffer.readUInt16LE();
        console.log(r.version);
        if (r.version >= 3) {
            r.byteFormat = this.buffer.readString(1);
            r.byteCompressionRefTable = this.buffer.readString(1);
            r.byteCompressionBody = this.buffer.readString(1);
            if (r.version >= 4) {
                r.unknown1 = this.buffer.readString(1);
            }
            r.classID = this.buffer.readUInt32LE().toString(16);
            if (r.version >= 6) {
                r.userDataSize = this.buffer.readUInt32LE();
                this.buffer.skip(r.userDataSize);
                // r.idk = this.buffer.readArray({
                //     type: "uint8",
                //     length: "userDataSize",
                // });
            }
            r.numNodes = this.buffer.readUInt32LE();
        }
        return r;
    }
}
exports.HeaderParser = HeaderParser;
//# sourceMappingURL=HeaderParser.js.map