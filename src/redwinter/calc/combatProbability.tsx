import {CombatColumn} from "./CRTView.tsx";
import {Percent} from "../ui/Percent.tsx";
import {ElementOf} from "./elementOf.tsx";
import {filter, map, pipe, sum} from "remeda";
import {exactly2d6} from "../ui/probability2d6.tsx";
import {defenderLosses} from "./DefenderLosses.tsx";

export function CombatProbability({combatColumn}: { combatColumn: CombatColumn }) {
    return <table class="vertical border compact">
        <thead>
        <tr>
            <th>Attacker loss</th>
            <td><Percent value={probability(combatColumn, it => it.attacker > 0)}/></td>
        </tr>
        <tr>
            <th>Attacker only loss</th>
            <td><Percent value={probability(combatColumn, it => it.attacker > 0 && defenderLosses(it) === 0)}/></td>
        </tr>
        <tr>
            <th>Defender loss</th>
            <td><Percent value={probability(combatColumn, it => defenderLosses(it) > 0)}/></td>
        </tr>
        <tr>
            <th>Defender loss only</th>
            <td><Percent value={probability(combatColumn, it => it.attacker == 0 && defenderLosses(it) > 0)}/></td>
        </tr>
        </thead>
    </table>
}

function probability(combatColumn: CombatColumn, predicate: (it: ElementOf<CombatColumn>) => boolean) {
    return pipe(
        combatColumn,
        map((it, index) => ({match: predicate(it), roll2d6: index + 2})),
        filter(({match}) => match),
        map(({roll2d6}) => exactly2d6(roll2d6)),
        sum()
    )
}
