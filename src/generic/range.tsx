/**
 * Generates an array of numbers in a range using Array.from with a fixed step of 1.
 * @param start The starting value of the range (inclusive).
 * @param end The ending value of the range (exclusive).
 * @returns An array of numbers.
 */
export function range(start: number, end: number): number[] {
    const length = Math.max(0, end - start + 1);
    return Array.from({length}, (_, i) => start + i);
}