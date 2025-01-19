import {describe, expect, it} from "vitest";
import {morale} from "./morale.ts";

function moraleResult(moraleVal: number, roll: number) {
    return morale(moraleVal, roll).result;
}

describe('morale', () => {
    it('SYR', () => {
        expect(moraleResult(5, 56)).toEqual('SYR');
        expect(moraleResult(-5, 65)).toEqual('SYR');
        expect(moraleResult(1, 65)).toEqual('SYR');
        expect(moraleResult(15, 11)).toEqual('SYR');
        expect(moraleResult(13, 23)).toEqual('SYR');
    })
    it('No Effect', () => {
        expect(moraleResult(8, 11)).toEqual('No Effect');
    });
    it('Surrender', () => {
        expect(moraleResult(7, 66)).toEqual('Surrender');
        expect(moraleResult(13, 42)).toEqual('Surrender');
    });
    it('undefined', () => {
        expect(moraleResult(NaN, 11)).toBeUndefined();
        expect(moraleResult(1, NaN)).toBeUndefined();
    })
})