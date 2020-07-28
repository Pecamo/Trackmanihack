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
    }
    TMBody() {
        while (true) {
            // console.log(this.buffer.currentOffset);
            const chunkID = this.buffer.readUInt32LE();
            if (chunkID >= 0x03043000 && chunkID <= 0x030430FF) {
                console.log(chunkID.toString(16), this.buffer.currentOffset);
            }
            if (chunkID === 0xFACADE01) {
                // TODO OnNodLoaded();
                console.log("Façade");
                // return;
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
                    break;
                case 0x03043013:
                case 0x0304301F:
                    console.log(0x0304301F.toString(16));
                    const trackParser = new TrackParser_1.TrackParser(this.buffer);
                    console.log(trackParser.TMTrack());
                    break;
                default:
                // console.warn(`Unhandled Chuck: ${chunkID.toString(16)}`);
            }
        }
    }
}
exports.BodyParser = BodyParser;
//# sourceMappingURL=BodyParser.js.map