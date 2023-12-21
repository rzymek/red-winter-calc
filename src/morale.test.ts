import {describe, expect, it} from "vitest";
import {morale} from "./morale.ts";

describe('morale', () => {
    it('SYR', () => {
        expect(morale(5, 56)).toEqual('SYR');
        expect(morale(-5, 65)).toEqual('SYR');
        expect(morale(1, 65)).toEqual('SYR');
        expect(morale(15, 11)).toEqual('SYR');
        expect(morale(13, 23)).toEqual('SYR');
    })
    it('No Effect', () => {
        expect(morale(8, 11)).toEqual('No Effect');
    });
    it('Surrender', () => {
        expect(morale(7, 66)).toEqual('Surrender');
        expect(morale(13, 42)).toEqual('Surrender');
    });
    it('undefined', () => {
        expect(morale(NaN, 11)).toBeUndefined();
        expect(morale(1, NaN)).toBeUndefined();
    })
})