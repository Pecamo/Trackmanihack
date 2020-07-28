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
        const value = this.buffer.toString('utf8', this.currentOffset, this.currentOffset + length);
        this.currentOffset += length;
        return value;
    }

    public skip(numberOfBytes: number): void {
        this.currentOffset += numberOfBytes;
    }
}
