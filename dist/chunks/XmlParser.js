"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlParser = void 0;
const GBXParser_1 = require("../GBXParser");
class XmlParser extends GBXParser_1.GBXParser {
    constructor(buffer) {
        super(buffer);
        this.buffer = buffer;
    }
    TMXml() {
        const xml = this.TMString();
        console.log(xml);
    }
}
exports.XmlParser = XmlParser;
//# sourceMappingURL=XmlParser.js.map