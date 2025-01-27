import {groupBy, mapValues, pipe, range} from "remeda";
import {inRange} from "./inRange.ts";
import {State} from "./state.ts";

export function probability(table: readonly (readonly string[])[], columnIndex: number, firerType: State['firererType']) {
    const resultsForRolls = range(1, 6 + 1).flatMap(d1 => range(1, 6 + 1).map(d2 => {
        const roll = d1 * 10 + d2;
        const [result] = table.find(([, ...rols]) => inRange(rols[columnIndex], roll)) ?? table[0]
        return result;
    }))
    function normalizeEffect(effect:string) {
        if(firerType === 'point' && effect ==='Morale Check') {
            return 'No Effect'
        }else{
            return effect;
        }
    }
    return pipe(
        resultsForRolls,
        groupBy(normalizeEffect),
        mapValues(arr => 100 * arr.length / resultsForRolls.length)
    )
}