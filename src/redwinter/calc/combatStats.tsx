import {CS, state} from "../../state.ts";
import * as R from "remeda";
import {range} from "remeda";
import {attackerHexes} from "./attackerHexes.tsx";
import {shifts} from "./shifts.ts";
import {combatResult, shiftRatio} from "./crt.ts";
import {Flag} from "./flag.tsx";
import {otherNationality} from "./otherNationality.ts";

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

function formatShift(value: number) {
    if (value < 0) {
        return `${-value}L`
    } else if (value > 0) {
        return `${value}R`
    }
}

function formatCombatRatio(attacker: number, defender: number) {
    if (attacker > defender) {
        return defender !== 0 ? `${Math.floor(attacker / defender)}:1` : '1:1';
    } else {
        return attacker !== 0 ? `1:${Math.ceil(defender / attacker)}` : '1:1';
    }
}

function mandatoryAttackerLosses(attacker: number) {
    if (state.assault) {
        return attacker;
    } else {
        return Math.max(0, attacker - 1);
    }
}

function EmptyZero(props: { children: number }) {
    return <>{props.children === 0 ? '' : props.children}</>
}

function defenderLosses(combatResult: { defender: number }) {
    if (state.hotel) {
        return Math.max(0, combatResult.defender - 1)
    } else {
        return combatResult.defender;
    }
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

    const ratio = formatCombatRatio(attacker, defender);
    const shift = shifts();
    const effectiveShift = R.pipe(
        shift,
        R.values(),
        R.flat(),
        R.map(it => it.value),
        R.sum(),
    );
    const effectiveRatio = shiftRatio(ratio, effectiveShift)
    const combatColumn = range(2, 12 + 1).map(roll2d6 => ({
        roll2d6,
        ...combatResult(roll2d6, effectiveRatio)
    }))
    return <>
        <div style={{display: 'flex', gap: '3mm'}}>
            <div style={{flex: 1}}>
                <table class="crt border compact">
                    <thead>
                    <tr>
                        <th>2d6</th>
                        <th>Attacker</th>
                        <th style={{fontSize: '75%'}}>attacker reductions</th>
                        <th>Defender</th>
                    </tr>
                    </thead>
                    <tbody>
                    {combatColumn.map(combatResult => (
                        <tr key={combatResult.roll2d6}>
                            <td>{combatResult.roll2d6}</td>
                            <td><EmptyZero>{combatResult.attacker}</EmptyZero></td>
                            <td><EmptyZero>{mandatoryAttackerLosses(combatResult.attacker)}</EmptyZero></td>
                            <td><EmptyZero>{defenderLosses(combatResult)}</EmptyZero></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div style={{flex: 1}}>
                <table class="shifts compact border">
                    <tbody>
                    <tr>
                        <th>Attacker CS <Flag nationality={otherNationality(state.combatDefenderNationality)}/></th>
                        <td>{attacker}</td>
                    </tr>
                    <tr>
                        <th>Defender CS <Flag nationality={state.combatDefenderNationality}/></th>
                        <td>{defender}</td>
                    </tr>
                    <tr>
                        <th>Effective column</th>
                        <td>{effectiveRatio}</td>
                    </tr>
                    <tr>
                        <th>Base column</th>
                        <td>{ratio}</td>
                    </tr>
                    {shift.map(it => (
                        <tr key={it.type}>
                            <th>{it.type}</th>
                            <td>{formatShift(it.value)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}
