import { readLookBackStringBuffer, firstLookbackStringParser, nextLookbackStringParser } from './lookBackString';
import { Parser } from 'binary-parser';

export function readMeta(numberOfStrings: number, names: string[]) {
    let meta = firstLookbackStringParser;

    for (let i = 0; i < numberOfStrings - 1; i++) {
        meta = meta
            .nest(`str${i}`, { type: nextLookbackStringParser })
    }

    return meta;
}

export function getMetaParser(numberOfStrings: number) {
    return new Parser()
        .endianess('little')
        .nest("str", {type: firstLookbackStringParser})
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
