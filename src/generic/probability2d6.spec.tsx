import { describe, expect, it } from "vitest";
import { atLeast2d6, exactly2d6 } from "./probability2d6.tsx";
import { range, sum } from "remeda";

describe('exactly2d6', () => {
  it('should return correct probabilities for valid inputs', () => {
    // Known probabilities for 2d6
    expect(exactly2d6(7)).toBeCloseTo(1/6); // 6/36 = 1/6 = ~0.1667
    expect(exactly2d6(6)).toBeCloseTo(5/36); // ~0.1389
    expect(exactly2d6(8)).toBeCloseTo(5/36); // ~0.1389
    expect(exactly2d6(5)).toBeCloseTo(4/36); // ~0.1111
    expect(exactly2d6(9)).toBeCloseTo(4/36); // ~0.1111
    expect(exactly2d6(4)).toBeCloseTo(3/36); // ~0.0833
    expect(exactly2d6(10)).toBeCloseTo(3/36); // ~0.0833
  });

  it('should return 0 for inputs below minimum (2)', () => {
    expect(exactly2d6(1)).toBe(0);
    expect(exactly2d6(0)).toBe(0);
    expect(exactly2d6(-1)).toBe(0);
  });

  it('should return 0 for inputs above maximum (12)', () => {
    expect(exactly2d6(13)).toBe(0);
    expect(exactly2d6(20)).toBe(0);
  });

  it('should handle boundary value at minimum (2)', () => {
    expect(exactly2d6(2)).toBeCloseTo(1/36); // ~0.0278
  });

  it('should handle boundary value at maximum (12)', () => {
    expect(exactly2d6(12)).toBeCloseTo(1/36); // ~0.0278
  });

  it('should have sum of all probabilities equal to 1', () => {
    const allProbabilities = range(2, 13).map(n => exactly2d6(n));
    expect(sum(allProbabilities)).toBeCloseTo(1);
  });
});

describe('atLeast2d6', () => {
  it('should return 1 when need <= 2', () => {
    expect(atLeast2d6(2)).toBeCloseTo(1);
    expect(atLeast2d6(1)).toBeCloseTo(1);
    expect(atLeast2d6(0)).toBeCloseTo(1);
    expect(atLeast2d6(-1)).toBeCloseTo(1);
  });

  it('should return 0 when need > 12', () => {
    expect(atLeast2d6(13)).toBe(0);
    expect(atLeast2d6(20)).toBe(0);
  });

  it('should calculate probability for need = 7', () => {
    // For 2d6, the probability of rolling at least 7 is 21/36 = 0.5833
    const result = atLeast2d6(7);
    expect(result).toBeCloseTo(0.5833, 4);
  });

  it('should calculate probability for need = 3', () => {
    // For 2d6, the probability of rolling at least 3 is 35/36 = 0.9722
    const result = atLeast2d6(3);
    expect(result).toBeCloseTo(0.9722, 4);
  });

  it('should calculate probability for need = 12', () => {
    // For 2d6, the probability of rolling at least 12 is 1/36 = 0.0278
    const result = atLeast2d6(12);
    expect(result).toBeCloseTo(0.0278, 4);
  });

  it('should calculate probability for need = 11', () => {
    // For 2d6, the probability of rolling at least 11 is 3/36 = 0.0833
    const result = atLeast2d6(11);
    expect(result).toBeCloseTo(0.0833, 4);
  });
});