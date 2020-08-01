"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThumbnailParser = void 0;
const GBXParser_1 = require("../GBXParser");
class ThumbnailParser extends GBXParser_1.GBXParser {
    constructor(buffer) {
        super(buffer);
        this.buffer = buffer;
    }
    TMThumbnail() {
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
exports.ThumbnailParser = ThumbnailParser;
//# sourceMappingURL=ThumbnailParser.js.map