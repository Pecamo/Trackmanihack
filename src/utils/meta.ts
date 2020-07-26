import { readLookBackString } from './lookBackString';


export function readMeta(buffer: Buffer, numberOfStrings: number): string[] {
    let offset = 0;
    let acc: string[] = [];

    for (let i = 0; i < numberOfStrings; i++) {
        const res = readLookBackString(buffer, offset, i === 0);
        offset = res.offset;
        acc.push(res.str);
    }

    return acc;
}
