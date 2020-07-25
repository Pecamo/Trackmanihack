import * as TMH from './index';
import * as path from 'path';


const map = TMH.loadMap(process.argv[2] ?? path.resolve('resources/research/maps/One.Map.Gbx'));
const header = map.readHeader();
console.log("Read :");
console.log(header);
