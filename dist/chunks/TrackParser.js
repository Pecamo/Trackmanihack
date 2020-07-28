"use strict";
// Chunk: 0304301F
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackParser = void 0;
const GBXParser_1 = require("../GBXParser");
class TrackParser extends GBXParser_1.GBXParser {
    constructor(buffer, stringList = []) {
        super(buffer, stringList);
        this.buffer = buffer;
        this.stringList = stringList;
    }
    TMTrack() {
        const result = {};
        // meta (trackUID, environment, mapAuthor)
        result.info = this.TMMeta(3);
        // string trackName
        result.trackName = this.TMString();
        // meta decoration (timeOfDay, environment, envirAuthor)
        // result.decoration = this.TMMeta(3);
        // // uint32 sizeX
        // result.sizeX = this.buffer.readUInt32LE();
        // // uint32 sizeY
        // result.sizeY = this.buffer.readUInt32LE();
        // // uint32 sizeZ
        // result.sizeZ = this.buffer.readUInt32LE();
        // // bool needUnlock
        // result.needUnlock = this.TMBool();
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
        return result;
    }
}
exports.TrackParser = TrackParser;
//# sourceMappingURL=TrackParser.js.map