import { GBXParser } from "./GBXParser";
import { GBXBuffer } from "./GBXBuffer";
import {chunks} from "./chunks";

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
                console.log(
                    "Chunk ID:",
                    chunkID.toString(16),
                    this.buffer.currentOffset - 4
                );
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
            } else {
                // Rewind SKIP check
                this.buffer.currentOffset -= 4;
            }

            if (chunkID in chunks) {
                const chunk = chunks[chunkID];
                chunk.parse(this);
            } else {
                console.log(chunkID.toString(16));
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
            const GmMat3 = [this.TMVec3(), this.TMVec3(), this.TMVec3()];
            this.TMVec3();
            this.buffer.readFloat();
            this.buffer.readFloat();
            this.buffer.readFloat();
        }
    }
}
