/*
    lookbackstring:[8] a form of compression which allows to avoid repeating the same string multiple times. Every time a new string is encountered, it is added to a string list, and from then on this list entry is referenced instead of repeating the string another time.
    
    - if this is the first lookback string encountered:
        - uint32 version (currently 3)
    - uint32 index: bit 31 and 30 define the string type. If both bits are 0, the index is a number. The actual index is represented by the bits 0-29. If this value is 0, a new string follows (and will be added to the string list). If it is greater than one, use the string at stringlist [index - 1]. If no data is provided (unassigned), the bits 30 and 31 indicate how this state is stored. If bit 31 is set, the string "Unassigned" is used, but if bit 30 is set, the value -1 is stored instead.
    - if the bits 0 through 29 are 0 and bit 30 or 31 is 1:
        - string newString. Append to the string list.

    Note: the lookback string state is reset after each header chunk. The string list is cleared completely, and the next lookback string will again trigger the version number. If index represents a number (bits 30 and 31 not set), it describes the position inside a global string table. In most cases it concerns the ID of a collection.

    Note: Virtual Skipper 2 uses version 2 of the lookback strings. In this version, the string is always stored, the index always contains the position within the global name table, and the field with the version is also always present. 
*/

import { readString } from "./readString";

const stringList = [];

export type LookBackString = string;

export function readLookBackString(buffer: Buffer, offset: number = 0, firstLookBack: boolean = true) {
    let str: string;

    if (firstLookBack) {
        const version = buffer.readUInt32LE(offset); // This seems to be 1. Maybe not always.
        offset += 4;
        if (version > 100000) {
            throw new Error('LookBackString: value of version is way too big');
        }

        let index = buffer.readUInt32LE(offset);
        offset += 4;
        // console.log("index", index);

        if (index > 100000) {
            throw new Error('LookBackString: value of index is way too big');
        }

        // bit 31 and 30 define the string type
        const bit30: number = index & 0x1;
        const bit31: number = index & 0x2 >> 1;
        
        // console.log(bit30, bit31);

        // index is a number
        if (bit30 === 0 && bit31 === 0) {
            // The actual index is represented by the bits 0-29
            index = index >> 2;

            // If this value is 0, a new string follows
            if (index === 0) {
                const res = readString(buffer, offset);
                str = res.str;
                offset = res.newOffset;

                stringList.push(str);
            } else {
                str = stringList[index - 1];
            }
        }
    } else {
        const res = readString(buffer, offset);
        str = res.str;
        offset = res.newOffset;

        stringList.push(str);
    }

    return { str, offset };
}
