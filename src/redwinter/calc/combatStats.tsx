import {CS, state} from "../state.ts";
import * as R from "remeda";
import {range} from "remeda";
import {attackerHexesFilter} from "./attackerHexesFilter.tsx";
import {combatShifts} from "./combatShiftsCalculation.ts";
import {combatResult, shiftRatio} from "./crt.ts";
import {Explanation} from "../ui/explanation.tsx";
import {CRTView} from "../ui/CRTView.tsx";
import {CombatProbability} from "../ui/combatProbability.tsx";
import {getTimeOfDay} from "./timeOfDay.tsx";

export function CombatStats() {
    const defender = R.pipe(
        state.cs[0],
        R.map(it => it.type === 'MG' ? it.value * 2 : it.value),
        R.sum(),
    )

    const attacker = R.pipe(
        state.cs,
        R.map(frozenLakeOrBridgePenalty),
        R.map(armorAtNightPenalty),
        R.filter(attackerHexesFilter),
        R.flat(),
        R.filter(it => it.type !== 'mortar'),
        R.map(it => it.value),
        R.sum(),
        Math.round,
    );

    const ratio = formatCombatRatio(attacker, defender);
    const shift = combatShifts();
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
                <CRTView value={combatColumn}/>
            </div>
            <div style={{flex: 1, display: 'flex', gap: '3mm', flexDirection: 'column', justifyContent:'space-between'}}>
                <Explanation attacker={attacker}
                             defender={defender}
                             effectiveRatio={effectiveRatio}
                             ratio={ratio}
                             shift={shift}/>
                <CombatProbability combatColumn={combatColumn}/>
            </div>
        </div>
    </>
}


function frozenLakeOrBridgePenalty(units: CS[], hexIndex: number) {
    if (state.map[hexIndex] === 'lake' || state.bridge === hexIndex) {
        return halvedCS(units)
    } else {
        return units;
    }
}
function armorAtNightPenalty(units: CS[]) {
    if (getTimeOfDay(state.turn) === 'night') {
        return halvedCS(units, unit => unit.type === 'armor')
    } else {
        return units;
    }
}

function halvedCS(units: CS[], filter:(cs:CS)=>boolean = ()=>true) {
    return units.map(unit => ({
        ...unit,
        value: filter(unit) ? Math.ceil(unit.value / 2) : unit.value,
    }));
}


function formatCombatRatio(attacker: number, defender: number) {
    if (attacker > defender) {
        return defender !== 0 ? `${Math.floor(attacker / defender)}:1` : '1:1';
    } else {
        return attacker !== 0 ? `1:${Math.ceil(defender / attacker)}` : '1:1';
    }
}
