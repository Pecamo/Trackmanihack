import { Parser } from "binary-parser";

export const readString = new Parser()
    .endianess("little")
    .uint32("strLength")
    .string("str", { length: "strLength" })

export function readStringBuffer(buffer: Buffer, offset: number = 0) {
    let strLength = buffer.readUInt32LE(offset);
    offset += 4;

    if (strLength > 100000) {
        throw new Error('LookBackString: value of strLength is way too big');
    }

    return {
        str: buffer.toString('utf8', offset, offset + strLength),
        strLength,
        newOffset: offset + strLength,
    }
}
