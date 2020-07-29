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
                // CLASS CGameCtnChallenge
                case 0x03043000:
                    return;
                case 0x03043002: // TmDesc
                    return;
                case 0x03043003: // Common
                    return;
                case 0x03043004: // Version
                    return;
                case 0x03043005: // Community
                    return;
                case 0x03043007: // Thumbnail
                    return;
                case 0x03043008: // Author
                    return;
                case 0x0304300d:
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
                case 0x03043012:
                    return;
                case 0x03043013:
                    return;
                case 0x03043014: // skippable
                    return;
                case 0x03043017: // skippable
                    return;
                case 0x03043018: // skippable
                    return;
                case 0x03043019: // skippable
                    return;
                case 0x0304301c: // skippable
                    return;
                case 0x0304301f:
                    console.log((0x0304301f).toString(16));
                    const trackParser = new TrackParser(this.buffer);
                    console.log(trackParser.TMTrack());
                    break;
                case 0x03043021:
                    this.TMNodeReference(); // clipIntro
                    this.TMNodeReference(); // clipGroupInGame
                    this.TMNodeReference(); // clipGroupEndRace
                    break;
                case 0x03043022:
                    return;
                case 0x03043024:
                    return;
                case 0x03043025:
                    return;
                case 0x03043026:
                    this.TMNodeReference(); // clipGlobal
                    return;
                case 0x03043027:
                    return;
                case 0x03043028:
                    return;
                case 0x03043029: // skippable
                    return;
                case 0x0304302a:
                    return;
                case 0x0304303d: // skippable
                    return;
                case 0x03043044: // skippable
                    return;
                case 0x03043054: // skippable
                    return;

                // CLASS CGameCtnCollectorList
                case 0x0301b000:
                    this.CGameCtnCollectorList();
                    break;

                // CLASS CGameCtnChallengeParameters
                case 0x0305b000: // All fields are ignored
                    return;
                case 0x0305b001:
                    this.CGameCtnChallengeParameters();
                    break;
                case 0x0305b002: // All fields are ignored
                    return;
                case 0x0305b003: // All fields are ignored
                    return;
                case 0x0305b004:
                    return;
                case 0x0305b005:
                    return;
                case 0x0305b006:
                    return;
                case 0x0305b007:
                    return;
                case 0x0305b008:
                    return;
                case 0x0305b00a:
                    return;
                case 0x0305b00d:
                    return;
                case 0x0305b00e: // skippable
                    return;

                // CLASS CGameCtnBlockSkin
                case 0x03059000:
                    return;
                case 0x03059001:
                    return;
                case 0x03059002:
                    return;

                // CLASS CGameWaypointSpecialProperty
                case 0x0313b000:
                    return;

                // CLASS CGameCtnReplayRecord
                case 0x03093000: // Version
                    return;
                case 0x03093001: // Community
                    return;
                case 0x03093002: // Author (header) (body)
                    return;
                case 0x03093007: // skippable
                    return;
                case 0x03093014:
                    return;
                case 0x03093015:
                    return;

                // CLASS CGameGhost
                case 0x0303f005:
                    return;
                case 0x0303f006:
                    return;

                // CLASS CGameCtnGhost
                case 0x03092000: // skippable
                    return;
                case 0x03092005: // skippable
                    return;
                case 0x03092008: // skippable
                    return;
                case 0x03092009: // skippable
                    return;
                case 0x0309200a: // skippable
                    return;
                case 0x0309200b: // skippable
                    return;
                case 0x0309200c:
                    return;
                case 0x0309200e:
                    return;
                case 0x0309200f:
                    return;
                case 0x03092010:
                    return;
                case 0x03092012:
                    return;
                case 0x03092013: // skippable
                    return;
                case 0x03092014: // skippable
                    return;
                case 0x03092015:
                    return;
                case 0x03092017: // skippable
                    return;
                case 0x03092018:
                    return;
                case 0x03092019:
                    return;

                // CLASS CGameCtnCollector
                case 0x0301a000:
                    return;
                case 0x0301a003: // Desc (header)
                    return;
                case 0x0301a004: // Icon (header)
                    return;
                case 0x0301a006: // (header)
                    return;
                case 0x0301a007:
                    return;
                case 0x0301a008:
                    return;
                case 0x0301a009:
                    return;
                case 0x0301a00b:
                    return;
                case 0x0301a00c:
                    return;
                case 0x0301a00d:
                    return;
                case 0x0301a00e:
                    return;
                case 0x0301a00f:
                    return;


                // CLASS CGameCtnObjectInfo
                case 0x0301c000: // (header)
                    return;
                case 0x0301c001: // (header)
                    return;
                case 0x0301c006:
                    return;

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
