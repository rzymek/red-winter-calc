import {Flag} from "./flag.tsx";
import {otherNationality} from "./otherNationality.ts";
import {state} from "../../state.ts";

export function Explanation(props: {
    attacker: number,
    defender: number,
    effectiveRatio: string,
    ratio: string,
    shift: { type: string, value: number }[]
}) {
    return <table class="shifts compact border">
        <tbody>
        <tr>
            <th>Attacker CS <Flag nationality={otherNationality(state.combatDefenderNationality)}/></th>
            <td>{props.attacker}</td>
        </tr>
        <tr>
            <th>Defender CS <Flag nationality={state.combatDefenderNationality}/></th>
            <td>{props.defender}</td>
        </tr>
        <tr>
            <th>Effective column</th>
            <td>{props.effectiveRatio}</td>
        </tr>
        <tr>
            <th>Base column</th>
            <td>{props.ratio}</td>
        </tr>
        {props.shift.map(it => (
            <tr key={it.type}>
                <th>{it.type}</th>
                <td>{formatShift(it.value)}</td>
            </tr>
        ))}
        </tbody>
    </table>;
}

function formatShift(value: number) {
    if (value < 0) {
        return `${-value}L`
    } else if (value > 0) {
        return `${value}R`
    }
}
