import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";
import { GlobalState } from "../GlobalState";

export class CommonParser extends GBXParser {
    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMCommon() {
        const metadata: any = {};
        metadata.version = GlobalState.getInstance().state.version = this.buffer.readByte();
        [
            metadata.trackUID,
            metadata.environment,
            metadata.mapAuthor,
        ] = this.TMMeta(3);
        metadata.trackName = this.TMString();
        metadata.kind = this.buffer.readByte();

        if (metadata.version >= 1) {
            metadata.locked = this.TMBool();
            metadata.password = this.TMString();

            if (metadata.version >= 2) {
                metadata.decoration = this.TMMeta(3);

                if (metadata.version >= 3) {
                    metadata.mapOrigin = this.TMVec2();

                    if (metadata.version >= 4) {
                        metadata.mapTarget = this.TMVec2();

                        if (metadata.version >= 5) {
                            metadata.mapTarget = this.buffer.readBytes(16);

                            if (metadata.version >= 6) {
                                metadata.mapType = this.TMString();
                                metadata.mapStyle = this.TMString();

                                if (metadata.version <= 8) {
                                    this.TMBool();
                                }

                                if (metadata.version >= 8) {
                                    metadata.lightmapCacheUID = this.buffer.readBytes(
                                        8
                                    );

                                    if (metadata.version >= 9) {
                                        metadata.lightmapVersion = this.buffer.readByte();

                                        if (metadata.version >= 11) {
                                            metadata.titleUID = this.TMLookbackString();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        console.log(metadata);
    }
}
