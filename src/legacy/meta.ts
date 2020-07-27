import { readLookBackStringBuffer, nextLookbackStringParser } from './lookBackString';
import { Parser } from 'binary-parser';

export function readMeta(numberOfStrings: number) {
//    const meta = new Parser()
//    .nest("metaFirst", {
//        type: firstLookbackStringParser,
//        // formatter: (data: any) => {
//        //     return data.str.str;
//        // }
//    })
//    .array("metaNext", {
//        type: nextLookbackStringParser,
//        length: numberOfStrings - 1,
//        formatter: (arr) => {
//            return (arr as any[]).map((item) => {
//                return item.str;
//            });
//        }
//    })
//
//    return meta;
}

export function readMetaBuffer(buffer: Buffer, numberOfStrings: number): string[] {
    let offset = 0;
    let acc: string[] = [];

    for (let i = 0; i < numberOfStrings; i++) {
        const res = readLookBackStringBuffer(buffer, offset, i === 0);
        offset = res.offset;
        acc.push(res.str);
    }

    return acc;
}
