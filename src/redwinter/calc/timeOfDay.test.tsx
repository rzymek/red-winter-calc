import {describe, expect, it} from "vitest";
import {getLOS, getTimeOfDay, TimeOfDay} from "./timeOfDay.tsx";

describe('timeOfDay', () => {
    it('getTimeOfDay', () => {
        expect(getTimeOfDay(-1)).toBe('dawn' satisfies TimeOfDay);
        expect(getTimeOfDay(0)).toBe('morning3' satisfies TimeOfDay);
        expect(getTimeOfDay(1)).toBe('morning4' satisfies TimeOfDay);
        expect(getTimeOfDay(17)).toBe('day' satisfies TimeOfDay);
        expect(getTimeOfDay(22)).toBe('morning4' satisfies TimeOfDay);
        expect(getTimeOfDay(32)).toBe('dusk' satisfies TimeOfDay);
        expect(getTimeOfDay(33)).toBe('night' satisfies TimeOfDay);
    });
    it('getLOS',()=>{
        expect(getLOS(1)).toBe(4);
        expect(getLOS(2)).toBe(5);
        expect(getLOS(3)).toBe(5);
        expect(getLOS(4)).toBe(2);
        expect(getLOS(5)).toBe(1);

        expect(getLOS(27)).toBe(2);
        expect(getLOS(28)).toBe(3);
        expect(getLOS(29)).toBe(4);
        expect(getLOS(30)).toBe(5);
        expect(getLOS(31)).toBe(5);
        expect(getLOS(32)).toBe(2);

    })
});
