import {range} from "remeda";
import {CSType} from "./redwinter/ui/CSStyles.tsx";

export type HexType = 'lake' | 'other'

export interface CS {
    value: number,
    type: CSType,
}

export type Tool = undefined | 'terrain' | 'bridge' | 'dugIn' | 'suppress' | CS | 'backspace';
const totalHexes = 7;
export const state = {
    selectedHex: undefined as number | undefined,
    bridge: undefined as number | undefined,
    map: range(0, totalHexes).map(_ => 'other' as HexType),
    suppression: range(0, totalHexes).map(_ => 0),
    assault: false,
    bonfire: false,
    dugIn: range(0, totalHexes).map(_ => false),
    hotel: false,
    cs: range(0, totalHexes).map(_ => [] as CS[]),
    selectedTool: undefined as Tool,
}

