import {areaFireRangeShift} from "./areaFireRangeShift.tsx";
import {State} from "./state.ts";
import {isDefined} from "remeda";

function infFirepowerDistanceBonus(state: State): number {
    if (state.firererType !== 'inf') {
        return 0;
    }
    const steps = state.firererSteps ?? 0;
    if (state.distance === 0) {
        return steps;
    }
    if (state.distance === 1) {
        return Math.round(steps / 2);
    }
    return 0;
}

function spottingRange(state: State): number {
    if (state.targetTerrain === undefined) {
        return Infinity;
    }
    const baseRange = 3;
    const table = {
        billiard: +2,
        open: 0,
        partly: -1,
        protective: -1,
    } as const;
    const terrainShift = table[state.targetTerrain];
    let range = baseRange + terrainShift;
    const env = state.targetEnv
    if (env.includes('illum / twilight')) {
        range += -1;
    } else if (env.includes('night')) {
        range += -3;
    }
    if (env.includes('firing')) {
        range += +4;
    }
    if (env.includes('road move') && state.firererEnv.includes('overwatch')) {
        range += +2;
    } else if (state.targetPosture === 'move') {
        range += +1;
    }
    //TODO: firerer dug in
    if (state.targetPosture === 'dug in') {
        range += -1;
    }
    return range;
}

function targetTerrainPosture(state: State): number {
    if (state.targetTerrain === undefined || state.targetPosture === undefined) {
        return 0;
    }
    const spotRange = spottingRange(state);
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
    const table = (Number(state.distance) <= spotRange) ? spotted : unspotted;
    const index = {
        move: 0,
        fire: 1,
        'dug in': 2
    };
    const row = table[state.targetTerrain];
    const rowIndex = index[state.targetPosture];
    return row[rowIndex] ?? 0
}

function otherModifiers(state: State) {
    let shift = 0;
    if (state.targetEnv.includes('night') && state.firererType !== 'arty') {
        shift += -2;
    }
    if (state.targetEnv.includes('illum / twilight') && state.firererType !== 'arty') {
        shift += -1;
    }
    if (state.targetEnv.includes('road move') && (state.firererEnv.includes('overwatch') || state.firererType === 'arty')) {
        shift += +2;
    }
    if (state.targetEnv.includes('all sup/par') && state.distance !== 0) {
        shift += -1;
    }
    if (state.targetEnv.includes('P+2 in hex') && includesLowTrajectory(state)) {
        shift += -2;
    }
    if (state.firererEnv.includes('any sup/par')) {
        shift += -2;
    }
    if (state.firererEnv.includes('cross fire') && state.distance !== 0 && includesLowTrajectory(state)) {
        shift += +4;
    }
    if (state.targetEnv.includes('arty zone') && state.firererType !== 'arty') {
        shift += -2;
    }
    if (state.firererEnv.includes('smoke') && state.firererType !== 'arty') {
        shift += -1;
    }
    return shift;
}

function includesLowTrajectory(state: State) {
    return state.firererType === 'inf' || state.firererType === 'low';
}

function areaTargetStacking(state: State): number {
    const modifier: Record<NonNullable<typeof state['targetSteps']>, number> = {
        "1-2": -3,
        "3-4": -1,
        "5-7": 0,
        "8-9": 1,
        "10-12": 3,
        "13-19": 6,
        "20+": 10,
    }
    const value = modifier[state.targetSteps ?? "5-7"] ?? 0;
    const noPenalty = state.firererType === 'arty' || (
        includesLowTrajectory(state) && spotted(state) && state.distance !== 0
    )
    return noPenalty ? Math.min(0, value) : 0;
}

function spotted(state: State) {
    return spottingRange(state) > (state.distance ?? Infinity);
}

export function fireResolution(state: State) {
    const baseFirepower = state.firepower.filter(isDefined)
        .reduce((a: number, b: number) => a + b, 0) as number;
    const spotRange = spottingRange(state);
    const firepower = baseFirepower + infFirepowerDistanceBonus(state);
    const shift = areaTargetStacking(state)
        + areaFireRangeShift(state)
        + targetTerrainPosture(state)
        + otherModifiers(state);
    const noLOS = state.targetEnv.includes('night') && (state.distance ?? Infinity) > 2;
    return {
        firepower,
        shift,
        spotRange,
        dbg: {
            spotted: spotted(state),
            baseFirepower,
            infFirepowerDistanceBonus: infFirepowerDistanceBonus(state),
            areaTargetStacking: areaTargetStacking(state),
            areaFireRangeShift: areaFireRangeShift(state),
            targetTerrainPosture: targetTerrainPosture(state),
            otherModifiers: otherModifiers(state),
        },
        noLOS
    };
}