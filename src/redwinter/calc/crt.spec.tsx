import {describe, expect, it} from "vitest";
import {combatResult} from "./crt.ts";

function result(r: string) {
    const [attacker, defender ] = r.split('/').map(it=>Number(it));
    return {
        attacker,
        defender
    }
}

describe('crt', () => {
    it('should return correct combat results for various dice rolls and ratios', () => {
        expect(combatResult(12, '6:1')).toEqual(result('0/8'));
        expect(combatResult(7, '1:1')).toEqual(result('1/0'));
        expect(combatResult(2, '1:4')).toEqual(result('5/0'));
    });
});