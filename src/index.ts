console.log("hello world")

class TMHHeader {
  public version: number;
  public byteFormat: string;
  public classID: string;
}

class TMHMap {
  readHeader() {
    return {} as TMHHeader;
  }
}

export const loadMap = (path: string) => {
  return {} as TMHMap
}
