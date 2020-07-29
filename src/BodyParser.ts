import { GBXParser } from "./GBXParser";
import { GBXBuffer } from "./GBXBuffer";
import { TrackParser } from "./chunks/TrackParser";

export class BodyParser extends GBXParser {
    protected nodeList = [];

    constructor(public buffer: GBXBuffer, public stringList: string[] = []) {
        super(buffer, stringList);
    }

    public TMNodeReference() {
        const index = this.buffer.readUInt32LE();
        console.log("index:", index);

        if (index >= 0) {
            const classId = this.buffer.readUInt32LE();
            console.log("classId:", classId.toString(16));
            this.TMNode();
        }
    }

    public TMNode() {
        while (true) {
            const chunkID = this.buffer.readUInt32LE();
            console.log(chunkID.toString(16), this.buffer.currentOffset);

            if (chunkID >= 0x03043000 && chunkID <= 0x030a30ff) {
                console.log(chunkID.toString(16), this.buffer.currentOffset);
            }

            if (chunkID === 0xfacade01) {
                // TODO OnNodLoaded();
                console.log("Façade");
                return;
            }

            // chunkFlags = GetChunkInfo(chunkID);
            const isSkippable = this.buffer.readString(4) === 'PIKS';
            if (isSkippable) {
                const skipSize = this.buffer.readUInt32LE();
                console.log(`SKIP ${skipSize} bytes`);
                this.buffer.skip(skipSize);
            } else {
                // Rewind SKIP check
                this.buffer.currentOffset -= 4;
            }

            switch (chunkID) {
                case 0x304300d:
                    // console.log(this.TMMeta(3));
                    // TODO Implement
                    this.buffer.skip(4 * 4);
                    break;

                case 0x03043011:
                    this.TMNodeReference();
                    this.TMNodeReference();
                    // 0: (internal)EndMarker, 1: (old)Campaign, 2: (old)Puzzle, 3: (old)Retro
                    // 4: (old)TimeAttack, 5: (old)Rounds, 6: InProgress, 7: Campaign,
                    // 8: Multi, 9: Solo, 10: Site, 11: SoloNadeo, 12: MultiNadeo
                    const kind = this.buffer.readUInt32LE();
                    console.log("kind", kind);
                    break;
                case 0x301b000:
                    this.CGameCtnCollectorList();
                    break;
                case 0x0305b000:
                case 0x0305b001:
                    this.CGameCtnChallengeParameters();
                    break;
                case 0x0304301f:
                    console.log((0x0304301f).toString(16));
                    const trackParser = new TrackParser(this.buffer);
                    console.log(trackParser.TMTrack());
                    break;
                default:
                    return;
                // console.warn(`Unhandled Chuck: ${chunkID.toString(16)}`);
            }
        }
    }

    // 0x0301B000
    public CGameCtnCollectorList() {
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
    public CGameCtnChallengeParameters() {
        console.log("CGameCtnChallengeParameters");
        const facadeOffset = this.buffer.seekFacade();
        console.log(facadeOffset);
        this.buffer.skip(facadeOffset);
    }
}
