"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadMap = void 0;
const fs_1 = require("fs");
class TMHMap {
    constructor(fileContent) {
        this.fileContent = fileContent;
    }
    readHeader() { }
}
exports.loadMap = (path) => {
    const fileContent = fs_1.readFileSync(path);
    return new TMHMap(fileContent);
};
//# sourceMappingURL=index.js.map