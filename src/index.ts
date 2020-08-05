import { readFileSync } from "fs";

class TMHMap {
    constructor(public fileContent: Buffer) {}

    readHeader() {}
}

export const loadMap = (path: string) => {
    const fileContent = readFileSync(path);
    return new TMHMap(fileContent);
};
