"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const TMH = require("./index");
const path = require("path");
const map = TMH.loadMap((_a = process.argv[2]) !== null && _a !== void 0 ? _a : path.resolve('resources/research/maps/One.Map.Gbx'));
const header = map.readHeader();
console.log("Read :");
console.log(header);
//# sourceMappingURL=test.js.map