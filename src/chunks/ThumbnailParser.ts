import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";

export class ThumbnailParser extends GBXParser {
    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMThumbnail() {
        const version = this.buffer.readUInt32LE();
        if (version !== 0) {
            const thumbnailSize = this.buffer.readUInt32LE();
            /*
            "<Thumbnail.jpg>"
            byte thumb[thumbSize]
            "</Thumbnail.jpg>"
            "<Comments>"
            string comments
            "</Comments>"
            */
        }
    }
}
