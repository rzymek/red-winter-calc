import {describe, expect, it} from "vitest";
import {combatResult} from "./crt.ts";

describe('crt', () => {
    it('should', () => {
        expect(combatResult(12,'6:1')).toEqual('0/8');
        expect(combatResult(7,'1:1')).toEqual('1/0');
        expect(combatResult(2,'1:4')).toEqual('5/0');
    })
});