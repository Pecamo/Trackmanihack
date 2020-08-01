"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorParser = void 0;
const GBXParser_1 = require("../GBXParser");
class AuthorParser extends GBXParser_1.GBXParser {
    constructor(buffer) {
        super(buffer);
        this.buffer = buffer;
    }
    TMAuthor() {
        const r = {};
        r.version = this.buffer.readUInt32LE();
        r.authorVersion = this.buffer.readUInt32LE();
        r.authorLogin = this.TMString();
        r.authorNick = this.TMString();
        r.authorZone = this.TMString();
        r.authorExtraInfo = this.TMString();
        console.log(r);
    }
}
exports.AuthorParser = AuthorParser;
//# sourceMappingURL=AuthorParser.js.map