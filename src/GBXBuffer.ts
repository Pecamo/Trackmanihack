export class GBXBuffer {
    public memory: object = {};
    protected currentOffset: number = 0;

    constructor(protected buffer: Buffer) {}

    public readUInt32LE(key: string): number {
        const value = this.buffer.readUInt32LE(this.currentOffset);
        this.memory[key] = value;
        this.currentOffset += 4;
        return value;
    }

    public readString(key: string, length: number): string {
        const value = this.buffer.toString('utf8', this.currentOffset, this.currentOffset + length);
        this.memory[key] = value;
        this.currentOffset += length
        return value;
    }
}
