import * as lzo from "lzo";
import * as fs from "fs";

export class GBXBuffer {
    public currentOffset: number = 0;

    constructor(protected buffer: Buffer) {}

    public readUInt32LE(): number {
        const value = this.buffer.readUInt32LE(this.currentOffset);
        this.currentOffset += 4;
        return value;
    }

    public readUInt16LE(): number {
        const value = this.buffer.readUInt16LE(this.currentOffset);
        this.currentOffset += 2;
        return value;
    }

    public readString(length: number): string {
        const value = this.buffer.toString(
            "utf8",
            this.currentOffset,
            this.currentOffset + length
        );
        this.currentOffset += length;
        return value;
    }

    public skip(numberOfBytes: number): void {
        this.currentOffset += numberOfBytes;
    }

    public decompress(
        compressedSize: number,
        decompressedSize?: number
    ): GBXBuffer {
        const lzoCompressedData = this.buffer.slice(
            this.currentOffset,
            this.currentOffset + compressedSize
        );
        const decompressedBuffer = lzo.decompress(
            lzoCompressedData,
            decompressedSize
        );
        this.currentOffset += compressedSize;
        fs.writeFileSync("./output.gbx", decompressedBuffer);
        const gbxBuffer = new GBXBuffer(decompressedBuffer);
        // TODO Check for errors
        return gbxBuffer;
    }

    public get length(): number {
        return this.buffer.length;
    }

    public seekFacade(): number {
        for (let i = 0; i < this.buffer.length - 4; i++) {
            if (
                this.buffer.slice(this.currentOffset).readUInt32LE(i) ===
                0xfacade01
            ) {
                return i;
            }
        }
    }

    public skipToFacade(): void {
        this.skip(this.seekFacade());
    }
}
