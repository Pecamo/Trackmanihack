"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderParser = void 0;
const GBXParser_1 = require("../GBXParser");
const GBXBuffer_1 = require("../GBXBuffer");
const GlobalState_1 = require("../GlobalState");
const chunks_1 = require("../chunks");
class HeaderParser extends GBXParser_1.GBXParser {
    constructor(buffer, stringList = []) {
        super(buffer);
        this.buffer = buffer;
        this.stringList = stringList;
    }
    TMHeader() {
        const r = {};
        r.magic = this.buffer.readString(3);
        r.version = this.buffer.readUInt16LE();
        if (r.version >= 3) {
            r.byteFormat = this.buffer.readString(1);
            r.byteCompressionRefTable = this.buffer.readString(1);
            r.byteCompressionBody = this.buffer.readString(1);
            if (r.version >= 4) {
                r.unknown1 = this.buffer.readString(1);
            }
            r.classID = this.buffer.readUInt32LE().toString(16);
            if (r.version >= 6) {
                r.userDataSize = this.buffer.readUInt32LE();
                // this.buffer.skip(r.userDataSize);
                r.numHeaderChunks = this.buffer.readUInt32LE();
                const headerChunks = [];
                for (let i = 0; i < r.numHeaderChunks; i++) {
                    headerChunks.push({
                        chunkId: this.buffer.readUInt32LE(),
                        // may have bit 31 set. This indicates a "heavy" header chunk which is
                        // skipped while scanning gbx files on game startup
                        chunkSize: this.buffer.readUInt32LE() & 0x7fffffff,
                    });
                }
                console.log(headerChunks);
                r.chunks = headerChunks.map((headerChunk) => {
                    GlobalState_1.GlobalState.getInstance().state.stringStorage = [];
                    const chunkIdBuffer = Buffer.alloc(4);
                    chunkIdBuffer.writeInt32LE(headerChunk.chunkId);
                    const chunkBuffer = this.buffer.nativeBuffer.slice(this.buffer.currentOffset, this.buffer.currentOffset + headerChunk.chunkSize);
                    this.buffer.currentOffset += headerChunk.chunkSize;
                    const buffer = new GBXBuffer_1.GBXBuffer(chunkBuffer);
                    const chunk = chunks_1.chunks[headerChunk.chunkId];
                    chunk.parse(buffer);
                });
                // TODO: Body parser needed.
                // r.idk = this.buffer.readArray({
                //     type: "uint8",
                //     length: "userDataSize",
                // });
            }
            r.numNodes = this.buffer.readUInt32LE();
        }
        return r;
    }
}
exports.HeaderParser = HeaderParser;
//# sourceMappingURL=HeaderParser.js.map