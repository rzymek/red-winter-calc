import {groupBy, mapValues, pipe, range} from "remeda";
import {inRange} from "./inRange.ts";

export function probability(table: readonly (readonly string[])[], columnIndex: number) {
    const resultsForRolls = range(1, 6 + 1).flatMap(d1 => range(1, 6 + 1).map(d2 => {
        const roll = d1 * 10 + d2;
        const [result] = table.find(([, ...rols]) => inRange(rols[columnIndex], roll)) ?? table[0]
        return result;
    }))
    return pipe(
        resultsForRolls,
        groupBy(effect => effect),
        mapValues(arr => 100 * arr.length / resultsForRolls.length)
    )
}