"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMetaBuffer = exports.getMetaParser = exports.readMeta = void 0;
const lookBackString_1 = require("./lookBackString");
const binary_parser_1 = require("binary-parser");
function readMeta(numberOfStrings, names) {
    let meta = lookBackString_1.firstLookbackStringParser;
    for (let i = 0; i < numberOfStrings - 1; i++) {
        meta = meta
            .nest(`str${i}`, { type: lookBackString_1.nextLookbackStringParser });
    }
    return meta;
}
exports.readMeta = readMeta;
function getMetaParser(numberOfStrings) {
    return new binary_parser_1.Parser()
        .endianess('little')
        .nest("str", { type: lookBackString_1.firstLookbackStringParser });
}
exports.getMetaParser = getMetaParser;
function readMetaBuffer(buffer, numberOfStrings) {
    let offset = 0;
    let acc = [];
    for (let i = 0; i < numberOfStrings; i++) {
        const res = lookBackString_1.readLookBackStringBuffer(buffer, offset, i === 0);
        offset = res.offset;
        acc.push(res.str);
    }
    return acc;
}
exports.readMetaBuffer = readMetaBuffer;
//# sourceMappingURL=meta.js.map