import { map, mapValues, mergeAll, pipe, range, sum } from 'remeda';

export function atLeast2d6(need: number) {
  if (isNaN(need)) {
    return NaN;
  }
  return pipe(
    range(Math.max(2, need), 12 + 1),
    map(v => probabilities2d6[v]),
    sum(),
  );
}

export function exactly2d6(need: number) {
  if (need < 2 || need > 12) return 0;
  return probabilities2d6[need];
}

const probabilities2d6 = diceSumProbabilities(2, 6);

function diceSumProbabilities(n: number, dice: number): Record<number, number> {
  const probabilities: Record<number, number> = pipe(
    range(n, n * dice + 1),
    map(i => ({[i]: 0})),
    mergeAll,
  );
  for (let i = 1; i <= dice; i++) {
    for (let j = 1; j <= dice; j++) {
      probabilities[i + j]++;
    }
  }
  const totalOutcomes = Math.pow(dice, 2);
  return mapValues(probabilities, v => v / totalOutcomes);
}
