import {state} from "../../state.ts";
import {defenderLosses} from "./DefenderLosses.tsx";

export type CombatColumn = {
    roll2d6: number;
    defender: number;
    attacker: number;
}[]

export function CRTView(props: { value: CombatColumn }) {
    const combatColumns = props.value;
    return <table class="crt border compact">
        <thead>
        <tr>
            <th>2d6</th>
            <th>Attacker</th>
            <th style={{fontSize: '75%'}}>attacker reductions</th>
            <th>Defender</th>
        </tr>
        </thead>
        <tbody>
        {combatColumns.map(combatResult => (
            <tr key={combatResult.roll2d6}>
                <td>{combatResult.roll2d6}</td>
                <td><EmptyZero>{combatResult.attacker}</EmptyZero></td>
                <td><EmptyZero>{mandatoryAttackerLosses(combatResult.attacker)}</EmptyZero></td>
                <td><EmptyZero>{defenderLosses(combatResult)}</EmptyZero></td>
            </tr>
        ))}
        </tbody>
    </table>;
}

function EmptyZero(props: { children: number }) {
    return <>{props.children === 0 ? '' : props.children}</>
}

function mandatoryAttackerLosses(attacker: number) {
    if (state.assault) {
        return attacker;
    } else {
        return attacker > 0 ? 1 : 0
    }
}


