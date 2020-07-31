"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const TMH = require("./index");
const path = require("path");
const fs = require("fs");
const GBXBuffer_1 = require("./GBXBuffer");
const HeaderParser_1 = require("./chunks/HeaderParser");
const ReferenceTableParser_1 = require("./chunks/ReferenceTableParser");
const BodyParser_1 = require("./BodyParser");
const filePath = (_a = process.argv[2]) !== null && _a !== void 0 ? _a : path.resolve("resources/research/maps/One.Map.Gbx");
const map = TMH.loadMap(filePath);
const header = map.readHeader();
console.log("Read :");
console.log(header);
const bufferFile = new GBXBuffer_1.GBXBuffer(fs.readFileSync(filePath));
const header2 = new HeaderParser_1.HeaderParser(bufferFile).TMHeader();
console.log(header2);
const referenceTable = new ReferenceTableParser_1.ReferenceTableParser(bufferFile).TMReferenceTable();
console.log(referenceTable);
console.assert(referenceTable.compressedDataSize ===
    bufferFile.length - bufferFile.currentOffset);
let data = bufferFile.decompress(referenceTable.compressedDataSize, referenceTable.dataSize);
console.assert(referenceTable.dataSize === data.length);
let bodyParser = new BodyParser_1.BodyParser(data);
bodyParser.TMNode();
//# sourceMappingURL=test.js.map