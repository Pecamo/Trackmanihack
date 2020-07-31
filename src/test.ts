import * as TMH from "./index";
import * as path from "path";
import * as fs from "fs";
import { GBXBuffer } from "./GBXBuffer";
import { GBXParser } from "./GBXParser";
import { TrackParser } from "./chunks/TrackParser";
import { HeaderParser } from "./chunks/HeaderParser";
import { ReferenceTableParser } from "./chunks/ReferenceTableParser";
import { BodyParser } from "./BodyParser";

const filePath =
    process.argv[2] ?? path.resolve("resources/research/maps/One.Map.Gbx");
const map = TMH.loadMap(filePath);
const header = map.readHeader();
console.log("Read :");
console.log(header);

const bufferFile = new GBXBuffer(fs.readFileSync(filePath));
const header2 = new HeaderParser(bufferFile).TMHeader();
console.log(header2);
const referenceTable = new ReferenceTableParser(bufferFile).TMReferenceTable();
console.log(referenceTable);

console.assert(
    referenceTable.compressedDataSize ===
        bufferFile.length - bufferFile.currentOffset
);
let data = bufferFile.decompress(
    referenceTable.compressedDataSize,
    referenceTable.dataSize
);
console.assert(referenceTable.dataSize === data.length);

let bodyParser = new BodyParser(data);
bodyParser.TMNode();
