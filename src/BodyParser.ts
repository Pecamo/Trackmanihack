import { GBXParser } from "./GBXParser";
import { GBXBuffer } from "./GBXBuffer";
import { TrackParser } from "./chunks/TrackParser";
import { GlobalState } from "./GlobalState";
import { CommonParser } from "./chunks/CommonParser";

export class BodyParser extends GBXParser {
    private isEof = false;
    protected nodeList = [];

    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMNodeReference() {
        const index = this.buffer.readUInt32LE();
        console.log("index:", index);

        if (index >= 0) {
            const classId = this.buffer.readUInt32LE();
            console.log("classId:", classId.toString(16));
            this.TMNode();

            if (this.buffer.currentOffset === this.buffer.length) {
                this.isEof = true;
                console.log("EOF");
            }
        }
    }

    public TMNode() {
        while (!this.isEof) {
            const chunkID = this.buffer.readUInt32LE();

            if (chunkID >= 0x0301a000 && chunkID <= 0x0313b000) {
                console.log("Chunk ID:", chunkID.toString(16), this.buffer.currentOffset);
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
                    break;
                case 0x03043002: // TmDesc
                    break;
                case 0x03043003: // Common
                    (new CommonParser(this.buffer)).TMCommon();
                    break;
                case 0x03043004: // Version
                    break;
                case 0x03043005: // Community
                    break;
                case 0x03043007: // Thumbnail
                    break;
                case 0x03043008: // Author
                    break;
                case 0x0304300d:
                    // console.log(this.TMMeta(3));
                    GlobalState.getInstance().state.isFirstLookback = false;
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
                    break;
                case 0x03043013:
                    break;
                case 0x03043014: // skippable
                    break;
                case 0x03043017: // skippable
                    break;
                case 0x03043018: // skippable
                    break;
                case 0x03043019: // skippable
                    break;
                case 0x0304301c: // skippable
                    break;
                case 0x0304301f:
                    console.log((0x0304301f).toString(16));
                    const trackParser = new TrackParser(this.buffer);
                    console.log(trackParser.TMTrack(chunkID));
                    break;
                case 0x03043021:
                    this.TMNodeReference(); // clipIntro
                    this.TMNodeReference(); // clipGroupInGame
                    this.TMNodeReference(); // clipGroupEndRace
                    break;
                case 0x03043022:
                    this.buffer.readUInt32LE();
                    break;
                case 0x03043024:
                    const ver = this.buffer.readByte();

                    if (ver >= 3) {
                        const checksum = this.buffer.readBytes(32);
                        console.log(checksum)
                    }

                    const filePath = this.TMString();

                    if (filePath.length > 0 && ver >= 1) {
                        const locatorUrl = this.TMString();
                    }

                    console.log(ver, filePath);
                    break;
                case 0x03043025:
                    const mapCoordOrigin = this.TMVec2();
                    const mapCoordTarget = this.TMVec2();
                    console.log(mapCoordOrigin, mapCoordTarget);
                    break;
                case 0x03043026:
                    this.TMNodeReference(); // clipGlobal
                    break;
                case 0x03043027:
                    this.ArchiveGmCamVal();
                    break;
                case 0x03043028:
                    this.ArchiveGmCamVal();
                    this.TMString();
                    break;
                case 0x03043029: // skippable
                    break;
                case 0x0304302a:
                    break;
                case 0x0304303d: // skippable
                    break;
                case 0x03043044: // skippable
                    break;
                case 0x03043054: // skippable
                    break;

                // CLASS CGameCtnCollectorList
                case 0x0301b000:
                    this.CGameCtnCollectorList();
                    break;

                // CLASS CGameCtnChallengeParameters
                case 0x0305b000: // All fields are ignored
                    break;
                case 0x0305b001:
                    this.CGameCtnChallengeParameters();
                    break;
                case 0x0305b002: // All fields are ignored
                    break;
                case 0x0305b003: // All fields are ignored
                    break;
                case 0x0305b004:
                    break;
                case 0x0305b005:
                    break;
                case 0x0305b006:
                    break;
                case 0x0305b007:
                    break;
                case 0x0305b008:
                    break;
                case 0x0305b00a:
                    break;
                case 0x0305b00d:
                    break;
                case 0x0305b00e: // skippable
                    break;

                // CLASS CGameCtnBlockSkin
                case 0x03059000:
                    break;
                case 0x03059001:
                    break;
                case 0x03059002:
                    break;

                // CLASS CGameWaypointSpecialProperty
                case 0x0313b000:
                    break;

                // CLASS CGameCtnReplayRecord
                case 0x03093000: // Version
                    break;
                case 0x03093001: // Community
                    break;
                case 0x03093002: // Author (header) (body)
                    break;
                case 0x03093007: // skippable
                    break;
                case 0x03093014:
                    break;
                case 0x03093015:
                    break;

                // CLASS CGameGhost
                case 0x0303f005:
                    break;
                case 0x0303f006:
                    break;

                // CLASS CGameCtnGhost
                case 0x03092000: // skippable
                    break;
                case 0x03092005: // skippable
                    break;
                case 0x03092008: // skippable
                    break;
                case 0x03092009: // skippable
                    break;
                case 0x0309200a: // skippable
                    break;
                case 0x0309200b: // skippable
                    break;
                case 0x0309200c:
                    break;
                case 0x0309200e:
                    break;
                case 0x0309200f:
                    break;
                case 0x03092010:
                    break;
                case 0x03092012:
                    break;
                case 0x03092013: // skippable
                    break;
                case 0x03092014: // skippable
                    break;
                case 0x03092015:
                    break;
                case 0x03092017: // skippable
                    break;
                case 0x03092018:
                    break;
                case 0x03092019:
                    break;

                // CLASS CGameCtnCollector
                case 0x0301a000:
                    break;
                case 0x0301a003: // Desc (header)
                    break;
                case 0x0301a004: // Icon (header)
                    break;
                case 0x0301a006: // (header)
                    break;
                case 0x0301a007:
                    break;
                case 0x0301a008:
                    break;
                case 0x0301a009:
                    break;
                case 0x0301a00b:
                    break;
                case 0x0301a00c:
                    break;
                case 0x0301a00d:
                    break;
                case 0x0301a00e:
                    break;
                case 0x0301a00f:
                    break;


                // CLASS CGameCtnObjectInfo
                case 0x0301c000: // (header)
                    break;
                case 0x0301c001: // (header)
                    break;
                case 0x0301c006:
                    break;

                default:
                    console.log(chunkID.toString(16));
                    // return;
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

    public ArchiveGmCamVal() {
        const archiveGmCamVal = this.TMBool();
        if (archiveGmCamVal) {
            this.buffer.readByte();
            const GmMat3 = [
                this.TMVec3(),
                this.TMVec3(),
                this.TMVec3(),
            ]
            this.TMVec3();
            this.buffer.readFloat();
            this.buffer.readFloat();
            this.buffer.readFloat();
        }
    }
}
