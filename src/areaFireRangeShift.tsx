import {State} from "./state.ts";

export function areaFireRangeShift(state: State): number {
    const type = state.firererType;
    if (state.distance === undefined || type === undefined) {
        return 0;
    }
    const distance = normalize(state.distance)
    const table = {
        inf: [+4, +2, +1, 0, -1, -2, -3, -6],
        low: [+4, +2, +1, 0, 0, -1, -2, -3],
        high: [+4, +2, +1],
        mortar: [0],
        arty: [0],
        point: [],
    } as const;
    return table[type][distance] ?? 0;

    function normalize(distance: number) {
        if (distance >= 9) {
            return 7;
        }
        if (6 <= distance && distance <= 8) {
            return 6;
        }
        return distance;
    }
}