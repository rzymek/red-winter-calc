import {describe, expect, it, beforeEach} from "vitest";
import {resetState, state} from "../state.ts";
import {mandatoryAttackerLosses} from "./mandatoryAttackerLosses.tsx";

describe('mandatoryAttackerLosses', () => {
    beforeEach(() => {
        resetState();
    });

    it('should return attacker value when assault is true', () => {
        // given
        state.assault = true;
        const attacker = 3;

        // when
        const result = mandatoryAttackerLosses(attacker);

        // then
        expect(result).toBe(3);
    });

    it('should return 1 when attacker is positive and assault is false', () => {
        // given
        state.assault = false;
        const attacker = 2;

        // when
        const result = mandatoryAttackerLosses(attacker);

        // then
        expect(result).toBe(1);
    });

    it('should return 0 when attacker is zero and assault is false', () => {
        // given
        state.assault = false;
        const attacker = 0;

        // when
        const result = mandatoryAttackerLosses(attacker);

        // then
        expect(result).toBe(0);
    });
});