import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";

export class DescriptionParser extends GBXParser {
    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMDescription() {
        const r: any = {};
        r.version = this.buffer.readByte();

        if (r.version < 3) {
            [r.trackUID, r.environment, r.mapAuthor] = this.TMMeta(3);
            r.trackName = this.TMString();
        }

        this.TMBool();

        if (r.version >= 1) {
            r.bronzeTime = this.buffer.readUInt32LE();
            r.silverTime = this.buffer.readUInt32LE();
            r.goldTime = this.buffer.readUInt32LE();
            r.authorTime = this.buffer.readUInt32LE();

            if (r.version == 2) {
                this.buffer.readByte();
            }
            if (r.version >= 4) {
                r.cost = this.buffer.readUInt32LE();

                if (r.version >= 5) {
                    r.isMultilap = this.TMBool();

                    if (r.version == 6) {
                        this.TMBool();
                    }

                    if (r.version >= 7) {
                        // 0: Race, 1: Platform, 2: Puzzle, 3: Crazy,
                        // 4: Shortcut, 5: Stunts, 6: Script
                        r.trackType = this.buffer.readUInt32LE();

                        if (r.version >= 9) {
                            this.buffer.readUInt32LE();

                            if (r.version >= 10) {
                                r.authorScore = this.buffer.readUInt32LE();

                                if (r.version >= 11) {
                                    r.editMode = this.buffer.readUInt32LE();
                                    r.isAdvancedEditor = (r.editMode & 0x1) !== 0
                                    r.hasGhostBlocks = (r.editMode & 0x2) !== 0

                                    if (r.version >= 12) {
                                        this.TMBool();

                                        if (r.version >= 13) {
                                            r.nbCheckpoints = this.buffer.readUInt32LE();
                                            r.nbLaps = this.buffer.readUInt32LE();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return r;
    }
}
