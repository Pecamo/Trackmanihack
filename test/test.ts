import * as TMH from '../src/index';


const map = TMH.loadMap(process.argv[2] ?? '../resources/research/maps/One.Map.Gbx');
const header = map.readHeader();
console.log("Tests :");
console.log(header.version === 6);
console.log(header.byteFormat === 'B' || header.byteFormat === 'T');
console.log(header.classID);
