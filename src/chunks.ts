import {DescriptionParser} from "./chunks/DescriptionParser";
import {CommonParser} from "./chunks/CommonParser";
import {XmlParser} from "./chunks/XmlParser";
import {ThumbnailParser} from "./chunks/ThumbnailParser";
import {AuthorParser} from "./chunks/AuthorParser";
import {TrackParser} from "./chunks/TrackParser";
import {GlobalState} from "./GlobalState";
import { GBXBuffer } from "./GBXBuffer";
import { BodyParser } from "./BodyParser";

type Chunk = {
  parse: (buffer: GBXBuffer) => void,
  skippable?: boolean,
  name?: string,
  class?: string,
}

const classDescriptions = {
  0x043 : "CGameCtnChallenge",
  0x01B : "CGameCtnCollectorList",
  0x05B : "CGameCtnChallengeParameters",
  0x059 : "CGameCtnBlockSkin",
  0x13B : "CGameWaypointSpecialProperty",
  0x093 : "CGameCtnReplayRecord",
  0x03F : "CGameGhost",
  0x092 : "CGameCtnGhost",
  0x01A : "CGameCtnCollector",
  0x01C : "CGameCtnObjectInfo",
  0x038 : "CGameCtnDecoration",
  0x033 : "CGameCtnCollection",
  0x031 : "CGameSkin",
  0x08C : "CGamePlayerProfile",
  0x001 : "CMwNod",
}

const getClass = (chunkId: number) => {
  const classNr = (chunkId - chunkId % 0x1000) / 0x1000;
  return classDescriptions[classNr];
}

export const chunks: {[key: number]: Chunk} = {
  0x03043000: {
    parse: () => {}
  },
  0x03043002: {
    name: "TmDesc",
    parse: (buffer) => {
      console.log(buffer.currentOffset, buffer.length);
      return new DescriptionParser(buffer).TMDescription();
    },
  },
  0x03043003: {
    name: "Common",
    parse: (buffer) => {
      return new CommonParser(buffer).TMCommon();
    },
  },

  0x03043004: {
    name: "Version",
    parse: (buffer) => {
      return buffer.readUInt32LE();
    },
  },
  0x03043005: {
    name: "Community",
    parse: (buffer) => {
      return new XmlParser(buffer).TMXml();
    },
  },
  0x03043007: {
    name: "Thumbnail",
    parse: (buffer) => {
      return new ThumbnailParser(buffer).TMThumbnail();
    },
  },
  0x03043008: {
    name: "Author",
    parse: (buffer) => {
      return new AuthorParser(buffer).TMAuthor();
    },
  },
  0x0304300d: {
    parse: (buffer) => {
      // console.log(buffer.TMMeta(3));
      GlobalState.getInstance().state.isFirstLookback = false;
      // TODO Implement
      return buffer.skip(4 * 4);
    },
  },

  0x03043011: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.TMNodeReference();
      bp.TMNodeReference();
      // 0: (internal)EndMarker, 1: (old)Campaign, 2: (old)Puzzle, 3: (old)Retro
      // 4: (old)TimeAttack, 5: (old)Rounds, 6: InProgress, 7: Campaign,
      // 8: Multi, 9: Solo, 10: Site, 11: SoloNadeo, 12: MultiNadeo
      const kind = buffer.readUInt32LE();
      console.log("kind", kind);
    },
  },
  0x03043012: {
    parse: () => {},
  },
  0x03043013: {
    parse: () => {},
  },
  0x03043014: {
    parse: () => {},
    skippable: true,
  },
  0x03043017: {
    parse: () => {},
    skippable: true,
  },
  0x03043018: {
    parse: () => {},
    skippable: true,
  },
  0x03043019: {
    parse: () => {},
    skippable: true,
  },
  0x0304301c: {
    parse: () => {},
    skippable: true,
  },
  0x0304301f: {
    parse: (buffer) => {
      console.log((0x0304301f).toString(16));
      const trackParser = new TrackParser(buffer);
      console.log(trackParser.TMTrack(0x0304301f));
    },
  },
  0x03043021: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.TMNodeReference(); // clipIntro
      bp.TMNodeReference(); // clipGroupInGame
      bp.TMNodeReference(); // clipGroupEndRace
    },
  },
  0x03043022: {
    parse: (buffer) => {
      buffer.readUInt32LE();
    },
  },
  0x03043024: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      const customMusicPackDesc = bp.TMFileRef();
    },
  },
  0x03043025: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      const mapCoordOrigin = bp.TMVec2();
      const mapCoordTarget = bp.TMVec2();
      console.log(mapCoordOrigin, mapCoordTarget);
    },
  },
  0x03043026: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.TMNodeReference(); // clipGlobal

    },
  },
  0x03043027: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.ArchiveGmCamVal();
    },
  },
  0x03043028: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.ArchiveGmCamVal();
      bp.TMString();
    },
  },
  0x03043029: {
    parse: () => {},
    skippable: true,
  },
  0x0304302a: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.TMBool();
    },
  },
  // Not documented... seems skippable
  0x03043034: {
    parse: () => {},
  },
  // Not documented... seems skippable
  0x03043036: {
    parse: () => {},
  },
  // Not documented... seems skippable
  0x03043038: {
    parse: () => {},
  },
  // Not documented... seems skippable
  0x0304303e: {
    parse: () => {},
  },
  // Not documented... seems skippable
  0x03043040: {
    parse: () => {},
  },
  // Not documented... seems skippable
  0x03043042: {
    parse: () => {},
  },
  // Not documented... seems skippable
  0x03043043: {
    parse: () => {},
  },
  // Not documented... seems skippable (27760 bytes!)
  // Seems to contain the map again, but a bit differently
  0x03043048: {
    parse: (buffer) => {
      // Attempt to decode:
      const r: any = {};
      console.log(buffer.readUInt32LE()); // seems to always be 0
      r.version = buffer.readUInt32LE();
      console.log("version:", r.version);
      const nbBlocks = buffer.readUInt32LE();
      console.log("nbBlocks:", r.nbBlocks);

      for (let i = 0; i < nbBlocks; i++) {
        r.flags = buffer.readUInt32LE();
        console.log("flags:", r.flags.toString(16));

        if ((r.flags & 0xF) === 0) {
          const bp = new BodyParser(buffer);
          r.name = bp.TMString();
          console.log(r.name);
        }

        r.rotation = buffer.readByte();
        r.x = buffer.readByte();
        r.y = buffer.readByte();
        r.z = buffer.readByte();
        r.unknown = buffer.readUInt32LE(); // seems to always be 0x1000
      }
    },
  },


  // Not documented...
  0x03043049: {
    parse: (buffer) => {
      buffer.skip(36);
    },
  },
  0x0304303d: {
    parse: () => {},
    skippable: true,
  },
  0x03043044: {
    parse: () => {},
    skippable: true,
  },
  0x03043054: {
    parse: () => {},
    skippable: true,
  },

  // CLASS CGameCtnCollectorList
  0x0301b000: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.CGameCtnCollectorList();
    },
  },

  // CLASS CGameCtnChallengeParameters
  0x0305b000: {
    parse: () => {},
  }, // All fields are ignored
  0x0305b001: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      bp.CGameCtnChallengeParameters();
    },
  },
  0x0305b002: {
    parse: () => {},
  }, // All fields are ignored
  0x0305b003: {
    parse: () => {},
  }, // All fields are ignored
  0x0305b004: {
    parse: () => {},
  },
  0x0305b005: {
    parse: () => {},
  },
  0x0305b006: {
    parse: () => {},
  },
  0x0305b007: {
    parse: () => {},
  },
  0x0305b008: {
    parse: () => {},
  },
  0x0305b00a: {
    parse: () => {},
  },
  0x0305b00d: {
    parse: () => {},
  },
  0x0305b00e: {
    parse: () => {},
    skippable: true,
  },

  // CLASS CGameCtnBlockSkin
  0x03059000: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      const text = bp.TMString();
      const ignored = bp.TMString();
    },
  },
  0x03059001: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      const text2 = bp.TMString();
      const packDesc2 = bp.TMFileRef();
    },
  },
  0x03059002: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      const text3 = bp.TMString();
      const packDesc3 = bp.TMFileRef();
      const parentPackDesc = bp.TMFileRef();
    },
  },

  // Not documented...
  0x3059003: {
    parse: (buffer) => {
      const bp = new BodyParser(buffer);
      const text4 = bp.TMString();
      const packDesc4 = bp.TMFileRef();
    },
  },

  // CLASS CGameWaypointSpecialProperty
  0x0313b000: {
    parse: () => {},
  },
  0x2e009000: {
    parse: (buffer) => {
      const version = buffer.readUInt32LE();

      if (version === 1) {
        const spawn = buffer.readUInt32LE();
        const order = buffer.readUInt32LE();
      } else if (version === 2) {
        const bp = new BodyParser(buffer);
        const tag = bp.TMString();
        const order = buffer.readUInt32LE();

        console.log(tag, order);
      } else {
        throw new Error(`Unsupported version ${version}`);
      }
    },
  },

  // Not documented... Can be empty.
  0x2e009001: {
    parse: () => {},
  },

  // CLASS CGameCtnReplayRecord
  0x03093000: {
    name: "Version",
    parse: () => {},
  },
  0x03093001: {
    name: "Community",
    parse: () => {},
  },
  0x03093002: {
    name: "Author (header & body)",
    parse: () => {},
  },
  0x03093007: {
    parse: () => {},
    skippable: true,
  },
  0x03093014: {
    parse: () => {},
  },
  0x03093015: {
    parse: () => {},
  },

  // CLASS CGameGhost
  0x0303f005: {
    parse: () => {},
  },
  0x0303f006: {
    parse: () => {},
  },

  // CLASS CGameCtnGhost
  0x03092000: {
    parse: () => {},
    skippable: true,
  },
  0x03092005: {
    parse: () => {},
    skippable: true,
  },
  0x03092008: {
    parse: () => {},
    skippable: true,
  },
  0x03092009: {
    parse: () => {},
    skippable: true,
  },
  0x0309200a: {
    parse: () => {},
    skippable: true,
  },
  0x0309200b: {
    parse: () => {},
    skippable: true,
  },
  0x0309200c: {
    parse: () => {},
  },
  0x0309200e: {
    parse: () => {},
  },
  0x0309200f: {
    parse: () => {},
  },
  0x03092010: {
    parse: () => {},
  },
  0x03092012: {
    parse: () => {},
  },
  0x03092013: {
    parse: () => {},
    skippable: true,
  },
  0x03092014: {
    parse: () => {},
    skippable: true,
  },
  0x03092015: {
    parse: () => {},
  },
  0x03092017: {
    parse: () => {},
    skippable: true,
  },
  0x03092018: {
    parse: () => {},
  },
  0x03092019: {
    parse: () => {},
  },

  // CLASS CGameCtnCollector
  0x0301a000: {
    parse: () => {},
  },
  0x0301a003: {
    name: "Desc (header)",
    parse: () => {},
  },
  0x0301a004: {
    name: "Icon (header)",
    parse: () => {},
  },
  0x0301a006: {
    name: "(header)",
    parse: () => {},
  },
  0x0301a007: {
    parse: () => {},
  },
  0x0301a008: {
    parse: () => {},
  },
  0x0301a009: {
    parse: () => {},
  },
  0x0301a00b: {
    parse: () => {},
  },
  0x0301a00c: {
    parse: () => {},
  },
  0x0301a00d: {
    parse: () => {},
  },
  0x0301a00e: {
    parse: () => {},
  },
  0x0301a00f: {
    parse: () => {},
  },

  // CLASS CGameCtnObjectInfo
  0x0301c000: {
    name: "(header)",
    parse: () => {},
  },
  0x0301c001: {
    name: "(header)",
    parse: () => {},
  },
  0x0301c006: {
    parse: () => {},
  },
}
