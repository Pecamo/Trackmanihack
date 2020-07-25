"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const TMH = require("./index");
const map = TMH.loadMap((_a = process.argv[2]) !== null && _a !== void 0 ? _a : '../resources/research/maps/One.Map.Gbx');
const header = map.readHeader();
console.log("Tests :");
console.log(header.version === 6);
console.log(header.byteFormat === 'B' || header.byteFormat === 'T');
console.log(header.classID);
//# sourceMappingURL=test.js.map