import {clone, range} from "remeda";
import {CSType} from "./redwinter/ui/CSStyles.tsx";

export type HexType = 'lake' | 'other'

export interface CS {
    value: number,
    type: CSType,
}

export type Tool = undefined | 'terrain' | 'bridge' | 'dugIn' | 'suppress' | CS | 'backspace' | 'rat';
export type RATFirer = 'mortar' | 'IG' | 'armored' | 'infantry' | 'MG' | 'arty';
const totalHexes = 7;

const initialState = {
    bridge: undefined as number | undefined,
    map: range(0, totalHexes).map(_ => 'other' as HexType),
    suppression: range(0, totalHexes).map(_ => 0),
    assault: false,
    bonfire: false,
    dugIn: range(0, totalHexes).map(_ => false),
    hotel: false,
    cs: range(0, totalHexes).map(_ => [] as CS[]),
    selectedTool: undefined as Tool,
    rat: {
        firer: 'MG' as RATFirer,
        modifiers: {
            selfSpotting: false,
            nonAdjacentSpotter: false,
            longRange: false,
        },
        rs: 2,
        targetHex: undefined as number | undefined,
    },
    combatDefenderNationality: 'finnish' as 'finnish' | 'soviet',
    turn: 1,
    turnMarker: {
        changeOfFinnishOperationalStance: undefined as number | undefined,
        sovietMoraleCollapse: undefined as number | undefined,
    }
};

export const state = clone(initialState);

export function resetState() {
    Object.assign(state, initialState);
}