"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMeta = void 0;
const lookBackString_1 = require("./lookBackString");
function readMeta(buffer, numberOfStrings) {
    let offset = 0;
    let acc = [];
    for (let i = 0; i < numberOfStrings; i++) {
        const res = lookBackString_1.readLookBackString(buffer, offset, i === 0);
        offset = res.offset;
        acc.push(res.str);
    }
    return acc;
}
exports.readMeta = readMeta;
//# sourceMappingURL=meta.js.map