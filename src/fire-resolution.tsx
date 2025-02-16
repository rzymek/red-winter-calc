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
    const spottedTable = {
        billiard: [+4, +2, -1],
        open: [+2, 0, -2],
        partly: [0, -2, -4],
        protective: [-1, -3, -5]
    }
    const unspottedTable = {
        billiard: [+2, 0, -3],
        open: [0, -2, -5],
        partly: [-2, -5, -7],
        protective: [-3, -6, -8]
    }
    const table = (!spotted(state) && includesLowTrajectory(state)) ? unspottedTable : spottedTable;
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
    const isAssault = state.distance === 0;
    let shift = 0;
    if(state.firererType !== 'arty'/*11.3f*/) {
        if (state.targetEnv.includes('night')) {
            shift += -2;
        }
        if (state.targetEnv.includes('illum / twilight')) {
            shift += -1;
        }
        if (state.targetEnv.includes('arty zone')) {
            shift += -2;
        }
        if (state.firererEnv.includes('smoke')) {
            shift += -1;
        }
    }
    if (state.targetEnv.includes('road move') && (state.firererEnv.includes('overwatch') || state.firererType === 'arty')) {
        shift += +2;
    }
    if (state.targetEnv.includes('all sup/par') && !isAssault) {
        shift += -1;
    }
    if (state.targetEnv.includes('P+2 in hex') && includesLowTrajectory(state)) {
        shift += -2;
    }
    if (state.firererEnv.includes('any sup/par')) {
        shift += -2;
    }
    if (state.firererEnv.includes('cross fire') && !isAssault && includesLowTrajectory(state)) {
        shift += +4;
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
    const possiblePenalty = state.firererType === 'arty' || (
        includesLowTrajectory(state) && !spotted(state) && state.distance !== 0
    )
    return possiblePenalty ? value : Math.max(0, value);
}

function spotted(state: State) {
    const {distance = Infinity} = state;
    return distance <= spottingRange(state);
}

export function pointFireRange(state: State) {
    const {distance = NaN, pRange = NaN} = state;
    if (distance < Math.ceil(pRange / 2)) {
        return +5;
    } else if (distance <= pRange) {
        return +3;
    } else if (pRange < distance && distance <= pRange * 2) {
        return 0;
    } else {
        return NaN;
    }
}

function pointFireResolution(state: State) {
    const pointFireDifferential: Record<number, number> = {
        [+3]: 3,
        [+2]: 2,
        [+1]: 1,
        [0]: 0,
        [-1]: -2,
        [-2]: -4,
        [-3]: -8,
        [-4]: -12,
        [-5]: NaN,
    };
    const {lowestPFire = NaN, bestPDefence = NaN} = state;
    const differential = Math.min(Math.max(-5, lowestPFire - bestPDefence), 3);
    const differentialShift = pointFireDifferential[differential] ?? NaN;
    const spotRange = spottingRange(state);
    const noLOS = isNoLOS(state);

    const shift = differentialShift
        + targetTerrainPosture(state)
        + pointFireRange(state)
        + otherModifiers(state)
        + (state.extraShift ?? 0);
    return {
        differential,
        shift,
        spotRange,
        noLOS,
        dbg: {
            spotted: spotted(state),
            differential,
            differentialShift,
            targetTerrainPosture: targetTerrainPosture(state),
            pointFireRange: pointFireRange(state),
            otherModifiers: otherModifiers(state),
        },
    };
}

export function fireResolution(state: State) {
    if (state.firererType === 'point') {
        return pointFireResolution(state);
    } else {
        return areaFireResolution(state);
    }
}

function isNoLOS(state: State) {
    return (state.targetEnv.includes('night') && (state.distance ?? Infinity) > 2)
        || (state.firererEnv.includes('overwatch') && !spotted(state));
}

function areaFireResolution(state: State) {
    const baseFirepower = state.firepower.filter(isDefined)
        .reduce((a: number, b: number) => a + b, 0) as number;
    const spotRange = spottingRange(state);
    const firepower = baseFirepower + infFirepowerDistanceBonus(state);
    const shift = areaTargetStacking(state)
        + areaFireRangeShift(state)
        + targetTerrainPosture(state)
        + otherModifiers(state)
        + (state.extraShift ?? 0);
    const noLOS = isNoLOS(state);
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
