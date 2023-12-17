import {describe, expect, it} from "vitest";
import {fireTable, firetable, rawColumns} from "./firetable.ts";

describe('firetable', () => {
    it.skip('csv', async () => {
        const csvValue = (v: any) => `"${v}"`;
        const csvSeparator = ",";
        const csv = [
            ['Effect', ...rawColumns].map(csvValue).join(csvSeparator),
            ...firetable.map(row => row.map(csvValue).join(csvSeparator)),
        ].join('\n');
        const fs = require("fs/promises");
        await fs.writeFile("dist/firetable.csv", csv)
    })
    it('column', () => {
        expect(fireTable.column(0).label).toBe('0')
        expect(fireTable.column(1).label).toBe('1')
        expect(fireTable.column(7).label).toBe('7-8')
        expect(fireTable.column(8).label).toBe('7-8')
        expect(fireTable.column(9).label).toBe('9-10')
        expect(fireTable.column(81).label).toBe('81-100')
        expect(fireTable.column(90).label).toBe('81-100')
        expect(fireTable.column(100).label).toBe('81-100')
        expect(fireTable.column(101).label).toBe('101+')
        expect(fireTable.column(200).label).toBe('101+')
    })
    it('roll', () => {
        expect(fireTable.result(12,51)).toBe('-1 step');
    })
})