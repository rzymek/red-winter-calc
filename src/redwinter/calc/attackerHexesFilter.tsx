import {isDefenderHex} from "./IsDefenderHex.tsx";

export function attackerHexesFilter<T>(_: T, index: number) {
    return !isDefenderHex(index);
}