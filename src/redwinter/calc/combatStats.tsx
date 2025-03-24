import {CS, state} from "../../state.ts";
import * as R from "remeda";
import {attackerHexes} from "./attackerHexes.tsx";
import {shifts} from "./shifts.ts";
import {shiftRatio} from "./crt.ts";

function frozenLakeOrBridgePenalty(units: CS[], hexIndex: number) {
    console.log('frozenLakeOrBridgePenalty', units, hexIndex)
    if (state.map[hexIndex] === 'lake' || state.bridge === hexIndex) {
        return halvedCS(units)
    } else {
        return units;
    }
}

function halvedCS(units: CS[]) {
    return units.map(unit => ({
        ...unit,
        value: Math.ceil(unit.value / 2),
    }));
}

export function CombatStats() {
    const defender = R.pipe(
        state.cs[0],
        R.map(it => it.type === 'MG' ? it.value * 2 : it.value),
        R.sum(),
    )

    const attacker = R.pipe(
        state.cs,
        R.map(frozenLakeOrBridgePenalty),
        R.filter(attackerHexes),
        R.flat(),
        R.filter(it => it.type !== 'mortar'),
        R.map(it => it.value),
        R.sum()
    );

    const ratio = attacker > defender
        ? `${Math.floor(attacker / defender)}:1`
        : `1:${Math.ceil(defender / attacker)}`;
    const shift = shifts();
    const effectiveShift = R.pipe(
        shift,
        R.map(it=>it.value),
        R.sum(),
    );
    const effectiveRatio = shiftRatio(ratio, effectiveShift)
    return <pre>{
        JSON.stringify({
            defender,
            attacker,
            ratio,
            effectiveRatio,
            effectiveShift,
            shift: shift.map(it=>`${it.type}: ${it.value}`),
        }, null, 1)
    }</pre>
}