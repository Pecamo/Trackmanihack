import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";

export class HeaderParser extends GBXParser {
    constructor(public buffer: GBXBuffer, public stringList: string[] = []) {
        super(buffer);
    }

    public TMHeader() {
        const r: any = {};

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
