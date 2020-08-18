import { GBXParser } from "../GBXParser";
import { GBXBuffer } from "../GBXBuffer";

export class XmlParser extends GBXParser {
    constructor(public buffer: GBXBuffer) {
        super(buffer);
    }

    public TMXml() {
        const xml: string = this.TMString();
        console.log(xml);
        return { xml }
    }
}
