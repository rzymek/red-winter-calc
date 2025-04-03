import {CombatColumn} from "./CRTView.tsx";
import {Percent} from "../ui/Percent.tsx";
import {ElementOf} from "./elementOf.tsx";
import {filter, map, pipe, sum} from "remeda";
import {exactly2d6} from "../ui/probability2d6.tsx";
import {defenderLosses} from "./DefenderLosses.tsx";

const rows: { label: string, predicate: (it: ElementOf<CombatColumn>) => boolean }[] = [
    {label: "Attacker loss", predicate: it => it.attacker > 0},
    {label: "Attacker only loss", predicate: it => it.attacker > 0 && defenderLosses(it) === 0},
    {label: "Defender loss", predicate: it => defenderLosses(it) > 0},
    {label: "Defender loss only", predicate: it => it.attacker == 0 && defenderLosses(it) > 0}
];

export function CombatProbability({combatColumn}: { combatColumn: CombatColumn }) {
    return <table class="vertical border compact">
        <thead>
        {rows.map(row => (
            <tr key={row.label}>
                <th>{row.label}</th>
                <td><Percent value={probability(combatColumn, row.predicate)}/></td>
            </tr>
        ))}
        </thead>
    </table>
}

function probability(combatColumn: CombatColumn, predicate: (it: ElementOf<CombatColumn>) => boolean) {
    return pipe(
        combatColumn,
        filter(predicate),
        map(it => exactly2d6(it.roll2d6)),
        sum()
    );
}
