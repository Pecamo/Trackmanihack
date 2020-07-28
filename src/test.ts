import * as TMH from './index';
import * as path from 'path';
import * as fs from 'fs';
import { GBXBuffer } from './GBXBuffer';
import { GBXParser } from './GBXParser';
import { TrackParser } from './chunks/TrackParser';
import { HeaderParser } from './chunks/HeaderParser';
import { ReferenceTableParser } from './chunks/ReferenceTableParser';
import { BodyParser } from './BodyParser';

const filePath = process.argv[2] ?? path.resolve('resources/research/maps/One.Map.Gbx');
const map = TMH.loadMap(filePath);
const header = map.readHeader();
console.log("Read :");
console.log(header);

const bufferFile = new GBXBuffer(fs.readFileSync(filePath));
const header2 = new HeaderParser(bufferFile).TMHeader();
console.log(header2);
const referenceTable = new ReferenceTableParser(bufferFile).TMReferenceTable();
console.log(referenceTable);
console.log(bufferFile.getLength() - bufferFile.currentOffset);
let data = bufferFile.decompress(referenceTable.compressedDataSize, referenceTable.dataSize);
console.log(data.getLength());
let bodyParser = new BodyParser(data);
bodyParser.TMBody();

const raw = "0100000000000000160000006D79535F4A657932547A6157564944564775354437510A0000004465636F636861746F721D000000576F726C647C4575726F70657C537769747A65726C616E647C566175640000000003000000000000005B9901003F2B00001A0D30040303000000FF29000009113004030100000000B001038C000500000001DECAFA028C0202050301B0058C022A04000104B005032908018400070000000008B0050360EAA405060AB0050350494B531CB8012BCC0101FFFFFFFFFD040DCD090EDC0500081E00000012000000547261636B4D616E69615C544D5F52616365C00994130406000000183004850C08C003020300000019CD0229DC012004040000161F300403000000401B0000006A586F347234657770594F674676746A3876526E31556A656547351AB009002140160000006D79535F4A657932547A615756494456477535443751040000004C696E6500000040080000003438783438446179E4070F050000004E6164656F300000002800000030AA0A0006282C0000094010000000526F616454656368537472616967687401300930001088320E400B000000556E61737369676E65643101CC2B0305000040012FB80401060000402B5D002E355D002D355D002C355D002B355D002A355D0029355D0028355D0027355D0026355D0025355D0024355D0023355D0022355D0021355D0020355D001F355D001E355D001D355D001C355D001B355D001A355D0019355D0018355D0017355D0016355D0015355D0014355D0013355D0012355D0011355D0010355D000F355D000E355D000D355D000C355D000B355D000A355D0009355D0008355D0007355D0006355D0005355D0004355D0003355D0002355D0001305D0022DDC524CCC92004050025A4AC2B070026300491C828296D0029D9B7142BA400A40002E16EEC0C2ACD0534DD0404AA030036DC01BCA90FAE44F30449430000AE44DB0F493FDB0F493FB80403B44200002041AE0180BFAF00000038CC07ED093EDD010CA205000ADD0040DC02022400000005CD0218297C002E050042DC05015500000083EC00000038E81800220A0000004465636F636861746F721D000000576F726C647C4575726F70657C537769747A65726C616E647C566175640000000043C20C2820B80B0C202001000009000000D0110302D01194FAC8F790C608566F6964546F47726173739011A40002400500000090020101DECAFA2AEC000101000040AC04030000020000402000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000547C000200004001DE1800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006180DF074430040350494B535800A000000C500000000020001106000000020207000202194C69624D6170547970655FDC00001E56657273696F6E00010000001C526163655F417574686F7252616365576179706F696E7454696D6573010001DECAFA48CE0CA46EAC0C030600000032098C01000840";
const buffer = Buffer.from(raw, 'hex');

console.log(`=== GBX Parser ===`);
const rawStr = "1000000053756D6D65722032303230202D203235000000";
const bufferStr = Buffer.from(raw, 'hex');
const gbxBuffer = new GBXBuffer(bufferStr);
// const gbxParser = new GBXParser(gbxBuffer);
// const result = gbxParser.TMMeta(3);
const trackParser = new TrackParser(gbxBuffer);
const result = trackParser.TMTrack();
console.log(result);
/*

const decoration = "00000040080000003438783438446179E4070F050000004E6164656F300000002800000030AA0A0006282C0000094010000000526F616454656368537472616967687401300930001088320E400B000000556E61737369676E65643101CC2B030500004001";

const bufferDecoration = new GBXBuffer(Buffer.from(decoration, 'hex'));
console.log(new TrackParser(bufferDecoration).TMMeta(3));

const track = "000000401B0000006A586F347234657770594F674676746A3876526E31556A656547351AB009002140160000006D79535F4A657932547A615756494456477535443751040000004C696E6500000040080000003438783438446179E4070F050000004E6164656F300000002800000030AA0A0006282C0000094010000000526F616454656368537472616967687401300930001088320E400B000000556E61737369676E65643101CC2B0305000040012FB80401060000402B5D002E355D002D355D002C355D002B355D002A355D0029355D0028355D0027355D0026355D0025355D0024355D0023355D0022355D0021355D0020355D001F355D001E355D001D355D001C355D001B355D001A355D0019355D0018355D0017355D0016355D0015355D0014355D0013355D0012355D0011355D0010355D000F355D000E355D000D355D000C355D000B355D000A355D0009355D0008355D0007355D0006355D0005355D0004355D0003355D0002355D0001305D0022DDC524CCC92004050025A4AC2B070026300491C828296D0029D9B7142BA400A40002E16EEC0C2ACD0534DD0404AA030036DC01BCA90FAE44F30449430000AE44DB0F493FDB0F493FB80403B44200002041AE0180BFAF00000038CC07ED093EDD010CA205000ADD0040DC02022400000005CD0218297C002E050042DC05015500000083EC00000038E81800220A0000004465636F636861746F721D000000576F726C647C4575726F70657C537769747A65726C616E647C566175640000000043C20C2820B80B0C202001000009000000D0110302D01194FAC8F790C608566F6964546F47726173739011A400024005000000900201";
*/
