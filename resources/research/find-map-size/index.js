const raw = "000000401B0000004D4631435942785750586A3642326652384451324E30455F736C391AB009002240160000006D79535F4A657932547A61575649445647753544375105000000456D70747900000040080000003438783438446179E8070F050000004E6164656F300000002800000030AE0A0006DD0022D53124C4352004050025BC172B0700263004893428296D0029D123142BA400A400022FB0CD4B2ACD0534DD0404AA030036DC01B0150F2044F304354300002044DB0F493FDB0F493FB80403B44200002041AE0180BFAF00000038CC07ED093EDD010CA205000ADD0040DC02022400000005CD0218297C002E050042DC0501550000009B5700000038600600220A0000004465636F636861746F721D000000576F726C647C4575726F70657C537769747A65726C616E647C566175640000000043C20C2820B80B0C202001000009000000D0110302D0118C66C0630D400B000000566F6964546F47726173739011A40002400500000090020101DECAFA2AEC000101000040AC0403000002000040200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000FA7C00024001DECAFA1803F0F218000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000AE00F207";
const bytes = [];

for (let i = 0; i < raw.length; i += 2) {
    bytes.push(`${raw.charAt(i)}${raw.charAt(i + 1)}`);
}

for (let i = 0; i < bytes.length - 1; i++) {
    if (bytes[i] != "00") {
        if (bytes[i] == bytes[i + 1]) {
            console.log(i, bytes[i], parseInt(bytes[i], 16));
        }
    }
}

// spoiler: it's Nx32x32 (NN2020 in hex)
// The X dimension (height) seems to be compressed depending on the blocks on the map.
// For Empty and Line, it's 0x0C (12).

