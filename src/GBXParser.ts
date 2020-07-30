import { GBXBuffer } from "./GBXBuffer";
import { GlobalState } from "./GlobalState";

export class GBXParser {
    constructor(public buffer: GBXBuffer, public stringList: string[] = []) {}

    public TMString(): string {
        const length = this.buffer.readUInt32LE();
        return this.buffer.readString(length);
    }

    public TMBool(): boolean {
        return this.buffer.readUInt32LE() === 1;
    }

    public TMLookbackString(): string {
        const firstLookBack: boolean = GlobalState.getInstance().state.isFirstLookback;

        if (firstLookBack) {
            GlobalState.getInstance().state.isFirstLookback = false;

            const version = this.buffer.readUInt32LE(); // This seems to be 1. Maybe not always.

            if (version > 100000) {
                throw new Error(
                    "LookBackString: value of version is way too big"
                );
            }
        }

        const indexAndBits = this.buffer.readUInt32LE();

        // The actual index is represented by the bits 0-29
        // const index = indexAndBits >> 2;
        const index = indexAndBits & 0x3fffffff;

        // console.log(indexAndBits.toString(16));

        // bit 31 and 30 define the string type
        const bit30: number = indexAndBits & (0x40000000 >>> 30);
        const bit31: number = indexAndBits & (0x80000000 >>> 31);

        // console.log(bit30, bit31);

        // index is a number
        if (bit30 === 0 && bit31 === 0) {
            // If this value is 0, a new string follows
            if (index === 0) {
                const str = this.TMString();
                // console.log("New String:", str);
                return str;
            } else {
                console.log(`Stored String at index ${index}:`, this.stringList[index - 1]);
                return this.stringList[index - 1];
            }
        } else {
            if (bit30 === 0 && bit31 === 1) {
                return "Unassigned";
            } else if (bit30 === 1 && bit31 === 0) {
                return "-1";
            } else if (bit30 === 1 && bit31 === 1 && index === 0) {
                const str = this.TMString();
                this.stringList.push(str);
                return str;
            } else {
                return "";
            }
        }
    }

    public TMMeta(numberOfStrings: number): string[] {
        let acc = [];

        for (let i = 0; i < numberOfStrings; i++) {
            acc.push(this.TMLookbackString());
        }

        return acc;
    }
}
