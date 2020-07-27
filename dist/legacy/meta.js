"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMetaBuffer = exports.readMeta = void 0;
const lookBackString_1 = require("./lookBackString");
function readMeta(numberOfStrings) {
    //    const meta = new Parser()
    //    .nest("metaFirst", {
    //        type: firstLookbackStringParser,
    //        // formatter: (data: any) => {
    //        //     return data.str.str;
    //        // }
    //    })
    //    .array("metaNext", {
    //        type: nextLookbackStringParser,
    //        length: numberOfStrings - 1,
    //        formatter: (arr) => {
    //            return (arr as any[]).map((item) => {
    //                return item.str;
    //            });
    //        }
    //    })
    //
    //    return meta;
}
exports.readMeta = readMeta;
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