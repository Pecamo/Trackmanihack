import { Parser } from "binary-parser";
import { readFileSync } from 'fs';

class TMHMap {

  constructor(public fileContent: Buffer) {}

  readHeader() {
    const parser = new Parser()
      .endianess("little")
      .string("magic",
        {
          length: 3,
        }
      )
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
        formatter: function(data) {
          return data.toString(/*16*/);
        }
      })
      .uint32("userDataSize")
      .array("idk", {
        type: "uint8",
        length: "userDataSize"
      })
      .uint32("numNodes")

    return parser.parse(this.fileContent);
  }
}

export const loadMap = (path: string) => {
  const fileContent = readFileSync(path);
  return new TMHMap(fileContent);
}
