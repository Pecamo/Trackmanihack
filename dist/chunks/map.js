"use strict";
// Chunk: 0304301F
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackParser = void 0;
const GBXParser_1 = require("../GBXParser");
class TrackParser extends GBXParser_1.GBXParser {
    constructor(buffer) {
        super(buffer);
        this.buffer = buffer;
    }
    TMTrack() {
        const info = this.TMMeta(3);
        const trackName = this.TMMeta(3);
        // meta (trackUID, environment, mapAuthor)
        // string trackName
        // meta decoration (timeOfDay, environment, envirAuthor)
        // uint32 sizeX
        // uint32 sizeY
        // uint32 sizeZ
        // bool needUnlock
        // if chunkId != 03043013:
        //     uint32 version
        // uint32 numBlocks
        // for each block:
        //     lookbackstring blockName
        //     byte rotation (0/1/2/3)
        //     byte x
        //     byte y
        //     byte z
        //     if version == 0:
        //         uint16 flags
        //     if version > 0:
        //         uint32 flags
        //     if (flags == 0xFFFFFFFF)
        //         continue (read the next block)
        //     if (flags & 0x8000) != 0: custom block
        //         lookbackstring author
        //         noderef skin
        //     if (flags & 0x100000)
        //         noderef blockparameters
    }
}
exports.TrackParser = TrackParser;
//# sourceMappingURL=map.js.map