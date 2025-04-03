import {describe, expect, it, beforeEach} from "vitest";
import {defenderLosses} from "./defenderLosses.tsx";
import {resetState, state} from "../../state.ts";

describe('defenderLosses', () => {
    beforeEach(() => {
        resetState();
    });

    it('should return defender value when hotel is false', () => {
        // given
        state.hotel = false;
        const combatResult = { defender: 3 };

        // when
        const result = defenderLosses(combatResult);

        // then
        expect(result).toBe(3);
    });

    it('should reduce defender value by 1 when hotel is true', () => {
        // given
        state.hotel = true;
        const combatResult = { defender: 3 };

        // when
        const result = defenderLosses(combatResult);

        // then
        expect(result).toBe(2);
    });

    it('should return 0 when defender is 1 and hotel is true', () => {
        // given
        state.hotel = true;
        const combatResult = { defender: 1 };

        // when
        const result = defenderLosses(combatResult);

        // then
        expect(result).toBe(0);
    });

    it('should return 0 when defender is 0', () => {
        // given
        state.hotel = true;
        const combatResult = { defender: 0 };

        // when
        const result = defenderLosses(combatResult);

        // then
        expect(result).toBe(0);
    });
});