import {range} from "remeda";

export function firepowerDef(index: number) {
    return {
        label: `Firepower${index + 1}`,
        values: [
            index == 0 ? '+' : 0,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ],
    } as const
}

export const pickOneDefs = {
    distance: {
        label: 'Distance',
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    firererType: {
        label: 'Firerer Type',
        values: ['inf', 'low', 'high', 'mortar', 'arty']
    },
    firererSteps: {
        label: 'Firerer Steps',
        values: range(1, 40 + 1)
    },
    targetSteps: {
        label: "Target Steps",
        values: ['1-2', '3-4', '5-7', '8-9', '10-12', '13-19', '20+']
    },
    targetTerrain: {
        label: "Target Terrain",
        values: ['billiard', 'open', 'partly', 'protective']
    },
    targetPosture: {
        label: "Target Posture",
        values: ['move', 'fire', 'dug in'],
    },
    targetMorale: {
        label: 'Target Morale',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    targetStepLoses: {
        label: 'Target step Loses',
        values: [1, 2, 3, 4, 5]
    },
    targetBnMorale: {
        label: 'Target Bn Morale',
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    extraShift: {
        label: 'Extra Shift',
        values: [-3, -2, -1, 1, 2, 3],
    }
} as const;
export const pickManyDefs = {
    firererEnv: {
        label: 'Firerer Env',
        values: ['any sup/par', 'cross fire', 'arty zone', 'smoke']
    },
    targetEnv: {
        label: "Target Environment",
        values: ['night', 'illum / twilight', 'road move', 'firing', 'all sup/par',
            'P+2 in hex', 'arty zone', 'smoke', 'attacked by sortie', 'unassigned']
    },
} as const;

export type TPickOne = typeof pickOneDefs;
export type TPickMany = typeof pickManyDefs;

export type SingleSelectionFields = keyof TPickOne;
export type MultipleSelectionFields = keyof TPickMany;

export type State = {
    [key in SingleSelectionFields]?: TPickOne[key]['values'][number]
} & {
    [key in MultipleSelectionFields]: TPickMany[key]['values'][number][]
} & {
    firepower: (number | undefined)[]
};

export const initialState: State = {
    firepower: [undefined],
    firererEnv: [],
    targetEnv: [],
}