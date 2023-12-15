import {Value} from "./value.tsx";
import {areaFireRangeShift} from "./areaFireRangeShift.tsx";

export function firetable(state: Record<string, Value>) {
    const firepower = Object.entries(state)
        .map(([name, value]) => name.startsWith('Firepower') ? value : 0)
        .reduce((a, b) => a + b, 0);
    let shift = 0;
    shift += areaFireRangeShift(state)
    return JSON.stringify({
        firepower,
        shift,
    })
}