"use strict";
// Chunk: 0304301F
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackParser = void 0;
const GBXParser_1 = require("../GBXParser");
const BodyParser_1 = require("../BodyParser");
const GlobalState_1 = require("../GlobalState");
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
        let i = 0;
        while (i < result.numBlocks) {
            const block = {};
            block.blockName = this.TMLookbackString();
            block.rotation = this.buffer.readByte();
            block.x = this.buffer.readByte();
            block.y = this.buffer.readByte();
            block.z = this.buffer.readByte();
            if (GlobalState_1.GlobalState.getInstance().state.version === 0) {
                block.flags = this.buffer.readUInt16LE();
            }
            else {
                block.flags = this.buffer.readUInt32LE();
            }
            // console.log(block.flags.toString(16));
            if (block.flags === 0xFFFFFFFF) {
                continue;
            }
            // if (flags & 0x8000) != 0: custom block
            if ((block.flags & 0x8000) !== 0) {
                console.log("Custom Block!");
                // lookbackstring author
                block.customBlock = {};
                block.customBlock.blockAuthor = this.TMLookbackString();
                // Attempt to reverse engineer
                // block.customBlock.customIdk = this.buffer.readUInt32LE().toString(16);
                // block.customBlock.idk = this.TMLookbackString();
                // block.customBlock.idk2 = this.buffer.readUInt32LE();
                // block.customBlock.flags = this.buffer.readUInt32LE();
                // block.customBlock._a = this.TMLookbackString();
                // block.customBlock.rotation = this.buffer.readByte();
                // block.customBlock.x = this.buffer.readByte();
                // block.customBlock.y = this.buffer.readByte();
                // block.customBlock.z = this.buffer.readByte();
                // block.customBlock.flags2 = this.buffer.readUInt32LE().toString(16);
                // block.customBlock._c = this.TMLookbackString();
                // block.customBlock.rotation2 = this.buffer.readByte(),
                // block.customBlock.x2 = this.buffer.readByte(),
                // block.customBlock.y2 = this.buffer.readByte(),
                // block.customBlock.z2 = this.buffer.readByte(),
                // block.customBlock._e = this.TMLookbackString();
                // block.customBlock.trackUID = this.TMLookbackString();
                // block.customBlock.flags2 = this.buffer.readUInt32LE();
                console.log(block);
                // noderef skin
                ((new BodyParser_1.BodyParser(this.buffer)).TMNodeReference());
            }
            // if (flags & 0x100000)
            if ((block.flags & 0x100000) !== 0) {
                console.log("Block parameters");
                // noderef blockparameters
                ((new BodyParser_1.BodyParser(this.buffer)).TMNodeReference());
            }
            block.unassignedStr = this.TMLookbackString();
            block.idk = this.buffer.readUInt32LE();
            block.idk2 = this.buffer.readUInt32LE();
            i++;
            result.blocks.push(block);
        }
        return result;
    }
}
exports.TrackParser = TrackParser;
//# sourceMappingURL=TrackParser.js.map