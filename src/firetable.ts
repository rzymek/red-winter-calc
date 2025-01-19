import {groupBy, isString, mapValues, pipe, range} from "remeda";
import {inRange} from "./inRange.ts";

export const rawColumns = [
    0, 1, 2, 3, 4, 5, 6, '7-8', '9-10', '11-13', '14-16', '17-20', '21-25', '26-32', '33-40', '41-50', '51-64', '65-80', '81-100', '101+'
] as const;

export const firetable = [
    ['No Effect', '11..53', '11..51', '11..45', '11..43', '11..41', '11..35', '11..33', '11..26', '11..24', '11..22', '11..16', '11..14', '11..12'],
    ['Morale Check', '54..65', '52..63', '46..62', '44..61', '42..56', '36..54', '34..53', '31..51', '25..51', '23..45', '21..41', '15..35', '13..26', '11..23', '11..16', '11..14', '11..13'],
    ['-1 step', '66', '64..66', '63..66', '62..66', '61..66', '55..66', '54..65', '52..65', '52..64', '46..64', '42..62', '36..56', '31..54', '24..52', '21..45', '15..36', '14..35', '11..26', '11..23'],
    ['-2 steps', '', '', '', '', '', '', '66', '66', '65', '65', '63..64', '61..63', '55..61', '53..56', '46..53', '41..46', '36..45', '31..36', '24..33', '11..22'],
    ['-3 steps', '', '', '', '', '', '', '', '', '66', '66', '65..66', '64..65', '62..64', '61..63', '54..61', '51..56', '46..54', '41..46', '34..43', '23..33'],
    ['-4 steps', '', '', '', '', '', '', '', '', '', '', '', '66', '65', '64', '62..63', '61..63', '55..61', '51..54', '44..52', '34..43'],
    ['-5 steps', '', '', '', '', '', '', '', '', '', '', '', '', '66', '65', '64', '64', '62..63', '55..62', '53..55', '44..52'],
    ['-6 steps', '', '', '', '', '', '', '', '', '', '', '', '', '', '66', '65', '65', '64', '63..64', '56..62', '53..56'],
    ['-7 steps', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '66', '66', '65', '65', '63..64', '61..63'],
    ['-8 steps', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '66', '66', '65', '64..65'],
    ['-9 steps', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '66', '66'],
] as const;

export const fireTable = {
    column(resolution: { firepower: number, shift: number }) {
        const index = rawColumns.findIndex(colDef => {
            if (colDef === resolution.firepower) {
                return true;
            } else if (isString(colDef)) {
                const [from, to = Infinity] = colDef.split(/[-+]/)
                    .filter(v => v !== '')
                    .map(it => Number(it));
                return from <= resolution.firepower && resolution.firepower <= to;
            } else {
                return false;
            }
        });
        const effectiveIndex = Math.min(index + resolution.shift, rawColumns.length - 1)
        return {
            index: effectiveIndex,
            label: String(rawColumns[effectiveIndex])
        }
    },
    probability(column: number) {
        const resultsForRolls = range(1, 6 + 1).flatMap(d1 => range(1, 6 + 1).map(d2 => {
            const roll = d1 * 10 + d2;
            const [result] = firetable.find(([, ...rols]) => inRange(rols[column], roll)) ?? firetable[0]
            return result;
        }))
        return pipe(
            resultsForRolls,
            groupBy(effect => effect),
            mapValues(arr => 100 * arr.length / resultsForRolls.length)
        )
    },
    result(resolution: { firepower: number, shift: number }, roll: number) {
        const col = this.column(resolution);
        const row = firetable.find(([, ...rols]) => inRange(rols[col.index], roll)) ?? firetable[0]
        const result = row[0]
        return result;
    }
}

export type FireResolutionResult = ReturnType<typeof fireTable["result"]>
