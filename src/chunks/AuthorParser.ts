import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";

export class AuthorParser extends GBXParser {
    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMAuthor() {
        const r: any = {};
        r.version = this.buffer.readUInt32LE();
        r.authorVersion = this.buffer.readUInt32LE();
        r.authorLogin = this.TMString();
        r.authorNick = this.TMString();
        r.authorZone = this.TMString();
        r.authorExtraInfo = this.TMString();
        console.log(r);
    }
}