import {Value} from "./value.tsx";

export function areaFireRangeShift(state: Record<string, Value>) {
    const type = state['Firerer Type'];
    const distance = normalize(state.Distance)
    const table = {
        inf: [+4, +2, +1, 0, -1, -2, -3, -6],
        low: [+4, +2, +1, 0, 0, -1, -2, -3],
        high: [+4, +2, +1],
        mortar: [0],
    }
    return table[type]?.[distance] ?? 0;

    function normalize(distance) {
        if (distance >= 9 || `${distance}`.includes('+')) {
            return 7;
        }
        if (6 <= distance && distance <= 8) {
            return 6;
        }
        return distance;
    }
}