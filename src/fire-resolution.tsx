import {Value} from "./value.tsx";
import {areaFireRangeShift} from "./areaFireRangeShift.tsx";

function infFirepowerDistanceBonus(state: Record<string, Value>): number {
    if (state['Firerer Type'] !== 'inf') {
        return 0;
    }
    const steps = (state['Firerer Steps'] ?? 0) as number;
    if (state.Distance === 0) {
        return steps;
    }
    if (state.Distance === 1) {
        return Math.round(steps / 2);
    }
    return 0;
}

function spotingRange(state: Record<string, Value>): number {
    let baseRange = 3;
    const terrainShift = {
        billiard: +2,
        partly: -1,
        protective: -1,
    }[state['Target Terrain'] as string] ?? 0;
    let range = baseRange + terrainShift;
    const env = (state['Target Environment'] ?? []) as string[];
    if (env.includes('illum/twilight')) {
        range += -1;
    } else if (env.includes('night')) {
        range += -3;
    }
    if (env.includes('firing')) {
        range += +4;
    }
    if (env.includes('road move')) {
        range += +2;
    } else if (state['Target Posture'] === 'move') {
        range += +1;
    }
    //firerer dug in
    if (state['Target Posture'] === 'dug in') {
        range += -1;
    }
    return range;
}

function targetTerrainPosture(state: Record<string, Value>): number {
    const spotRange = spotingRange(state);
    const spotted = {
        billiard: [+4, +2, -1],
        open: [+2, 0, -2],
        partly: [0, -2, -4],
        protective: [-1, -3, -5]
    }
    const unspotted = {
        billiard: [+2, 0, -3],
        open: [0, -2, -5],
        partly: [-2, -5, -7],
        protective: [-3, -6, -8]
    }
    const table = (Number(state.Distance) <= spotRange) ? spotted : unspotted;
    const index = {
        move: 0,
        fire: 1,
        'dug in': 2
    };
    const row = table[state['Target Terrain'] as string] ?? [];
    const rowIndex = index[state['Target Posture'] as string];
    return row[rowIndex] ?? 0
}

export function fireResolution(state: Record<string, Value>) {
    const baseFirepower = Object.entries(state)
        .map(([name, value]) => name.startsWith('Firepower') ? value : 0)
        .reduce((a: number, b: number) => a + b, 0) as number;
    const spotRange = spotingRange(state);
    const firepower = baseFirepower + infFirepowerDistanceBonus(state);
    const shift = 0
        + areaFireRangeShift(state)
        + targetTerrainPosture(state);
    return {
        firepower,
        shift,
        spotRange,
    };
}