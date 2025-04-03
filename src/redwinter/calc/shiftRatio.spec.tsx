import {describe, expect, it} from "vitest";
import {shiftRatio} from "./crt.ts";

describe('shiftRatio', () => {
    // Happy Path tests
    it('should shift ratio forward correctly', () => {
        // Starting from 1:1 and shifting by 2 should result in 3:1
        expect(shiftRatio('1:1', 2)).toBe('3:1');
        // Starting from 2:1 and shifting by 1 should result in 3:1
        expect(shiftRatio('2:1', 1)).toBe('3:1');
    });

    it('should shift ratio backward correctly', () => {
        // Starting from 3:1 and shifting by -2 should result in 1:1
        expect(shiftRatio('3:1', -2)).toBe('1:1');
        // Starting from 2:1 and shifting by -1 should result in 1:1
        expect(shiftRatio('2:1', -1)).toBe('1:1');
    });

    it('should return the same ratio when shift is 0', () => {
        expect(shiftRatio('1:1', 0)).toBe('1:1');
        expect(shiftRatio('3:1', 0)).toBe('3:1');
        expect(shiftRatio('1:3', 0)).toBe('1:3');
    });

    // Input Verification tests
    it('should clamp shift to maximum ratio', () => {
        // Shifting beyond the maximum ratio (6:1) should return 6:1
        expect(shiftRatio('5:1', 2)).toBe('6:1');
        expect(shiftRatio('6:1', 10)).toBe('6:1');
    });

    it('should clamp shift to minimum ratio', () => {
        // Shifting below the minimum ratio (1:4) should return 1:4
        expect(shiftRatio('1:3', -2)).toBe('1:4');
        expect(shiftRatio('1:4', -10)).toBe('1:4');
    });

    it('should normalize ratios with attackers above maximum', () => {
        // Attacker value should be clamped to 6
        expect(shiftRatio('7:1', 0)).toBe('6:1');
        expect(shiftRatio('10:1', 0)).toBe('6:1');
    });

    it('should normalize ratios with defenders above maximum', () => {
        // Defender value should be clamped to 4
        expect(shiftRatio('1:5', 0)).toBe('1:4');
        expect(shiftRatio('1:10', 0)).toBe('1:4');
    });
});