import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";

export class ReferenceTableParser extends GBXParser {
    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMReferenceTable() {
        const r: any = {};

        r.numExternalNodes = this.buffer.readUInt32LE();

        if (r.numExternalNodes > 0) {
            throw new Error("External Nodes aren't supported yet.");
        }

        r.dataSize = this.buffer.readUInt32LE();
        r.compressedDataSize = this.buffer.readUInt32LE();

        return r;
    }
}
