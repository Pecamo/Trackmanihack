"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBXParser = void 0;
class GBXParser {
    constructor(buffer, stringList = []) {
        this.buffer = buffer;
        this.stringList = stringList;
    }
    TMString() {
        const length = this.buffer.readUInt32LE();
        return this.buffer.readString(length);
    }
    TMBool() {
        return this.buffer.readUInt32LE() === 1;
    }
    TMLookbackString(firstLookBack = true) {
        if (firstLookBack) {
            const version = this.buffer.readUInt32LE(); // This seems to be 1. Maybe not always.
            const indexAndBits = this.buffer.readUInt32LE();
            if (version > 100000) {
                throw new Error('LookBackString: value of version is way too big');
            }
            // The actual index is represented by the bits 0-29
            const index = indexAndBits >> 2;
            if (index > 100000) {
                throw new Error('LookBackString: value of index is way too big');
            }
            // bit 31 and 30 define the string type
            const bit30 = indexAndBits & 0x1;
            const bit31 = indexAndBits & 0x2 >> 1;
            // index is a number
            if (bit30 === 0 && bit31 === 0) {
                // If this value is 0, a new string follows
                if (index === 0) {
                    return this.TMString();
                }
                else {
                    return this.stringList[index - 1];
                }
            }
            else {
                if (bit30 === 0 && bit31 === 1) {
                    return "Unassigned";
                }
                else if (bit30 === 1 && bit31 === 0) {
                    return "-1";
                }
                else if (bit30 === 1 && bit31 === 1) {
                    const str = this.TMString();
                    this.stringList.push(str);
                    return str;
                }
            }
        }
        else {
            return this.TMString();
        }
    }
    TMMeta(numberOfStrings) {
        let acc = [];
        for (let i = 0; i < numberOfStrings; i++) {
            acc.push(this.TMLookbackString(i === 0));
        }
        return acc;
    }
}
exports.GBXParser = GBXParser;
//# sourceMappingURL=GBXParser.js.map