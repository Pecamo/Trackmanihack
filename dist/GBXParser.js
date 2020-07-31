"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GBXParser = void 0;
const GlobalState_1 = require("./GlobalState");
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
    TMVec2() {
        return {
            x: this.buffer.readFloat(),
            y: this.buffer.readFloat(),
        };
    }
    TMVec3() {
        return {
            x: this.buffer.readFloat(),
            y: this.buffer.readFloat(),
            z: this.buffer.readFloat(),
        };
    }
    TMColor() {
        return {
            r: this.buffer.readFloat(),
            g: this.buffer.readFloat(),
            b: this.buffer.readFloat(),
        };
    }
    TMLookbackString() {
        const firstLookBack = GlobalState_1.GlobalState.getInstance().state.isFirstLookback;
        if (firstLookBack) {
            GlobalState_1.GlobalState.getInstance().state.isFirstLookback = false;
            const version = this.buffer.readUInt32LE(); // This seems to be 1. Maybe not always.
            if (version > 100000) {
                throw new Error("LookBackString: value of version is way too big");
            }
        }
        const indexAndBits = this.buffer.readUInt32LE();
        // The actual index is represented by the bits 0-29
        // const index = indexAndBits >> 2;
        const index = indexAndBits & 0x3fffffff;
        // console.log(indexAndBits.toString(16));
        // bit 31 and 30 define the string type
        const bit30 = indexAndBits & (0x40000000 >>> 30);
        const bit31 = indexAndBits & (0x80000000 >>> 31);
        // console.log(bit30, bit31);
        // index is a number
        if (bit30 === 0 && bit31 === 0) {
            // If this value is 0, a new string follows
            if (index === 0) {
                const str = this.TMString();
                // console.log("New String:", str);
                return str;
            }
            else {
                console.log(`Stored String at index ${index}:`, this.stringList[index - 1]);
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
            else if (bit30 === 1 && bit31 === 1 && index === 0) {
                const str = this.TMString();
                this.stringList.push(str);
                return str;
            }
            else {
                return "";
            }
        }
    }
    TMMeta(numberOfStrings) {
        let acc = [];
        for (let i = 0; i < numberOfStrings; i++) {
            acc.push(this.TMLookbackString());
        }
        return acc;
    }
}
exports.GBXParser = GBXParser;
//# sourceMappingURL=GBXParser.js.map