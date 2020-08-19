"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParser = void 0;
const GBXParser_1 = require("./GBXParser");
const chunks_1 = require("./chunks");
const GlobalState_1 = require("./GlobalState");
class BodyParser extends GBXParser_1.GBXParser {
    constructor(buffer) {
        super(buffer);
        this.buffer = buffer;
        this.nodeList = [];
    }
    TMNodeReference() {
        const index = this.buffer.readUInt32LE();
        console.log("index:", index);
        if (index >= 0) {
            const classId = this.buffer.readUInt32LE();
            console.log("classId:", classId.toString(16));
            this.TMNode();
            if (this.buffer.currentOffset === this.buffer.length) {
                GlobalState_1.GlobalState.getInstance().state.isEof = true;
                console.log("EOF");
            }
        }
    }
    TMNode() {
        while (!GlobalState_1.GlobalState.getInstance().state.isEof) {
            const chunkID = this.buffer.readUInt32LE();
            if (chunkID >= 0x0301a000 && chunkID <= 0x0313b000) {
                console.log("Chunk ID:", chunkID.toString(16), this.buffer.currentOffset - 4);
            }
            if (chunkID === 0xfacade01) {
                // TODO OnNodLoaded();
                console.log("Façade");
                return;
            }
            // chunkFlags = GetChunkInfo(chunkID);
            const isSkippable = this.buffer.readString(4) === "PIKS";
            if (isSkippable) {
                const skipSize = this.buffer.readUInt32LE();
                console.log(`SKIP ${skipSize} bytes`);
                this.buffer.skip(skipSize);
                continue;
            }
            else {
                // Rewind SKIP check
                this.buffer.currentOffset -= 4;
            }
            if (chunkID in chunks_1.chunks) {
                const chunk = chunks_1.chunks[chunkID];
                chunk.parse(this.buffer);
            }
            else {
                console.error(`Unknown chunk ID: ${chunkID.toString(16)}, at ${this.buffer.currentOffset - 4}`);
            }
        }
    }
    // 0x0301B000
    CGameCtnCollectorList() {
        console.log("CGameCtnCollectorList");
        const archiveCount = this.buffer.readUInt32LE();
        for (let i = 0; i < archiveCount; i++) {
            // To be tested
            console.log("archiveCount", archiveCount.toString(16));
            const [blockName, collection, author] = this.TMMeta(3);
            this.buffer.readUInt32LE();
        }
    }
    // 0x0305B000
    CGameCtnChallengeParameters() {
        console.log("CGameCtnChallengeParameters");
        const facadeOffset = this.buffer.seekFacade();
        console.log(facadeOffset);
        this.buffer.skip(facadeOffset);
    }
    ArchiveGmCamVal() {
        const archiveGmCamVal = this.TMBool();
        if (archiveGmCamVal) {
            this.buffer.readByte();
            const GmMat3 = [this.TMVec3(), this.TMVec3(), this.TMVec3()];
            this.TMVec3();
            this.buffer.readFloat();
            this.buffer.readFloat();
            this.buffer.readFloat();
        }
    }
}
exports.BodyParser = BodyParser;
//# sourceMappingURL=BodyParser.js.map