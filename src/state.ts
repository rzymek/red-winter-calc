import {range} from "remeda";

export type HexType = 'lake' | 'other'

const totalHexes = 7;
export const state = {
    selectedHex: 0 as number | undefined,
    bridge: false,
    map: range(0, totalHexes).map(_ => 'other') as HexType[],
    suppression: range(0, totalHexes).map(_ => 0) as number[],
    assault: false,
    bonfire: false,
    dugIn: false,
}

