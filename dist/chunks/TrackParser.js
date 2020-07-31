"use strict";
// Chunk: 0304301F
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackParser = void 0;
const GBXParser_1 = require("../GBXParser");
const BodyParser_1 = require("../BodyParser");
class TrackParser extends GBXParser_1.GBXParser {
    constructor(buffer) {
        super(buffer);
        this.buffer = buffer;
    }
    TMTrack(chunkId) {
        const result = {};
        // meta (trackUID, environment, mapAuthor)
        result.info = this.TMMeta(3);
        // string trackName
        result.trackName = this.TMString();
        // meta decoration (timeOfDay, environment, envirAuthor)
        result.decoration = this.TMMeta(3);
        // // uint32 sizeX
        result.sizeX = this.buffer.readUInt32LE();
        // // uint32 sizeY
        result.sizeY = this.buffer.readUInt32LE();
        // // uint32 sizeZ
        result.sizeZ = this.buffer.readUInt32LE();
        // // bool needUnlock
        result.needUnlock = this.TMBool();
        // if chunkId != 03043013:
        if (chunkId !== 0x03043013) {
            // uint32 version
            result.version = this.buffer.readUInt32LE();
        }
        // uint32 numBlocks
        result.numBlocks = this.buffer.readUInt32LE();
        // for each block:
        result.blocks = [];
        // FIXME I don't know if it's supposed to be < or <=.
        for (let i = 0; i <= result.numBlocks; i++) {
            const block = {};
            block.blockName = this.TMLookbackString();
            block.rotation = this.buffer.readByte();
            block.x = this.buffer.readByte();
            block.y = this.buffer.readByte();
            block.z = this.buffer.readByte();
            // if version == 0:
            //     uint16 flags
            // if version > 0:
            //     uint32 flags
            block.flags = this.buffer.readUInt32LE();
            // if (flags == 0xFFFFFFFF)
            console.log(block.flags.toString(16));
            if (block.flags === 0xFFFFFFFF) {
                // continue (read the next block)
                result.blocks.push(block);
                continue;
            }
            // if (flags & 0x8000) != 0: custom block
            if ((block.flags & 0x8000) !== 0) {
                console.log("Custom Block!");
                // lookbackstring author
                block.blockAuthor = this.TMLookbackString();
                // noderef skin
                ((new BodyParser_1.BodyParser(this.buffer)).TMNodeReference());
            }
            // if (flags & 0x100000)
            if ((block.flags & 0x100000) !== 0) {
                console.log("Block parameters");
                // noderef blockparameters
                ((new BodyParser_1.BodyParser(this.buffer)).TMNodeReference());
            }
            result.blocks.push(block);
        }
        return result;
    }
}
exports.TrackParser = TrackParser;
//# sourceMappingURL=TrackParser.js.map