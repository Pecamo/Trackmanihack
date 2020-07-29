"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyParser = void 0;
const GBXParser_1 = require("./GBXParser");
const TrackParser_1 = require("./chunks/TrackParser");
class BodyParser extends GBXParser_1.GBXParser {
    constructor(buffer, stringList = []) {
        super(buffer, stringList);
        this.buffer = buffer;
        this.stringList = stringList;
        this.nodeList = [];
    }
    TMNodeReference() {
        const index = this.buffer.readUInt32LE();
        console.log('index:', index);
        if (index >= 0) {
            const classId = this.buffer.readUInt32LE();
            console.log('classId:', classId.toString(16));
            this.TMNode();
        }
    }
    TMNode() {
        while (true) {
            const chunkID = this.buffer.readUInt32LE();
            console.log(chunkID.toString(16), this.buffer.currentOffset);
            if (chunkID >= 0x03043000 && chunkID <= 0x030A30FF) {
                console.log(chunkID.toString(16), this.buffer.currentOffset);
            }
            if (chunkID === 0xFACADE01) {
                // TODO OnNodLoaded();
                console.log("Façade");
                return;
            }
            // chunkFlags = GetChunkInfo(chunkID);
            // const isSkippable = this.buffer.readString(4) === 'SKIP';
            // 
            // if (isSkippable) {
            //     const skipSize = this.buffer.readUInt32LE();
            //     this.buffer.skip(skipSize);
            // } else {
            //     // Rewind SKIP check
            //     this.buffer.currentOffset -= 4;
            // }
            switch (chunkID) {
                case 0x304300D:
                    // console.log(this.TMMeta(3));
                    // TODO Implement
                    this.buffer.skip(4 * 4);
                    break;
                case 0x03043011:
                    this.TMNodeReference();
                    this.TMNodeReference();
                    // (0: (internal)EndMarker, 1: (old)Campaign, 2: (old)Puzzle, 3: (old)Retro, 4: (old)TimeAttack, 5: (old)Rounds, 6: InProgress, 7: Campaign, 8: Multi, 9: Solo, 10: Site, 11: SoloNadeo, 12: MultiNadeo)
                    const kind = this.buffer.readUInt32LE();
                    console.log('kind', kind);
                    break;
                case 0x301b000:
                    this.CGameCtnCollectorList();
                    break;
                case 0x0305B000:
                case 0x0305B001:
                    this.CGameCtnChallengeParameters();
                    break;
                case 0x0304301F:
                    console.log(0x0304301F.toString(16));
                    const trackParser = new TrackParser_1.TrackParser(this.buffer);
                    console.log(trackParser.TMTrack());
                    break;
                default:
                    return;
                // console.warn(`Unhandled Chuck: ${chunkID.toString(16)}`);
            }
        }
    }
    // 0x0301B000
    CGameCtnCollectorList() {
        const archiveCount = this.buffer.readUInt32LE();
        for (let i = 0; i < archiveCount; i++) {
            // To be tested
            console.log('archiveCount', archiveCount.toString(16));
            const [blockName, collection, author] = this.TMMeta(3);
            this.buffer.readUInt32LE();
        }
    }
    // 0x0305B000
    CGameCtnChallengeParameters() {
        this.buffer.skipToFacade();
    }
}
exports.BodyParser = BodyParser;
//# sourceMappingURL=BodyParser.js.map