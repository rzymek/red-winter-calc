import {describe, it} from "vitest";
import {colums, firetable} from "./firetable.ts";
const fs = require("fs/promises");

describe('firetable', () => {
    it.skip('csv', async () => {
        const csvValue = (v: any) => `"${v}"`;
        const csvSeparator = ",";
        const csv = [
            ['Effect', ...colums].map(csvValue).join(csvSeparator),
            ...firetable.map(row => row.map(csvValue).join(csvSeparator)),
        ].join('\n');
        await fs.writeFile("dist/firetable.csv", csv)
    })
})