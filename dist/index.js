"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMap = void 0;
const binary_parser_1 = require("binary-parser");
const fs_1 = require("fs");
class TMHMap {
    constructor(fileContent) {
        this.fileContent = fileContent;
    }
    readHeader() {
        const parser = new binary_parser_1.Parser()
            .endianess("little")
            .string("magic", {
            length: 3,
        })
            .uint16("version")
            .string("byteFormat", {
            length: 1
        })
            .string("byteCompressionRefTable", {
            length: 1
        })
            .string("byteCompressionBody", {
            length: 1
        })
            .string("unknown1", {
            length: 1
        })
            .uint32("classID", {
            formatter: function (data) {
                return data.toString( /*16*/);
            }
        })
            .uint32("userDataSize")
            .array("idk", {
            type: "uint8",
            length: "userDataSize"
        })
            .uint32("numNodes");
        return parser.parse(this.fileContent);
    }
}
exports.loadMap = (path) => {
    const fileContent = fs_1.readFileSync(path);
    return new TMHMap(fileContent);
};
//# sourceMappingURL=index.js.map