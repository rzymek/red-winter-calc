import {state} from "../state.ts";
import * as R from "remeda";
import {attackerHexesFilter} from "./attackerHexesFilter.tsx";
import {CSType} from "../ui/CSStyles.tsx";
import {every} from "../../generic/every.ts";
import {isDefenderHex} from "./IsDefenderHex.tsx";

type Shift = { type: string, value: number };

function defenderDugIn(): Shift[] {
    if (state.dugIn[0]) {
        return [{type: '7. Dug-In', value: -1}];
    }
    return [];
}

function between(min: number, v: number, max: number) {
    return Math.max(min, Math.min(max, v))
}

function suppression() {
    const defenderSuppression = state.suppression[0];
    const attackerSuppression = R.pipe(
        state.suppression,
        R.filter(attackerHexesFilter),
        R.sum(),
    );
    const suppression = between(-3, defenderSuppression - attackerSuppression, 3);
    if (suppression !== 0) {
        return [{type: '3. Suppression', value: suppression}]
    }
    return [];
}

function isOneOfDefenders(type: CSType) {
    return state.cs[0].some(it => it.type === type);
}

function isOneOfAttackers(type: CSType) {
    return R.pipe(
        state.cs,
        R.filter(attackerHexesFilter),
        R.flat(),
        R.filter(it => it.type === type),
        R.hasAtLeast(1)
    )

}


function defenderInLake() {
    if (state.map[0] !== 'lake') {
        return [];
    }
    const allCombatHexesAreFrozenLake = R.pipe(
        state.cs,
        R.map((units, hexIndex) => ({units, hexIndex})),
        R.filter(({units}) => units.length > 0),
        R.map(({hexIndex}) => state.map[hexIndex]),
        every(combatHex => combatHex === 'lake'),
    );
    if (allCombatHexesAreFrozenLake) {
        return [{
            type: '5. Frozen lake (all units)',
            value: state.combatDefenderNationality === 'soviet' ? 1 : -1
        }];
    } else {
        return [{
            type: '5. Frozen lake',
            value: state.combatDefenderNationality === 'soviet' ? 4 : 3
        }];
    }
}

function pajariLeaderBonus() {
    const type = '6. Pajari';
    if (isOneOfAttackers('pajari')) {
        return [{type, value: 1}]
    } else if (isOneOfDefenders('pajari')) {
        return [{type, value: -1}]
    }
    return [];
}

function concentricAttackBonus() {
    const attackingHexes = R.pipe(
        state.cs,
        R.map((units, hexIndex) => ({units, hexIndex})),
        R.filter(({hexIndex}) => !isDefenderHex(hexIndex)),
        R.filter(({units}) => units.length > 0),
        R.map(({hexIndex}) => hexIndex),
    );
    const opposingHexes: number[][] = [
        [1, 4],
        [2, 5],
        [3, 6]
    ];

    const evenlySpacedHexes: number[][] = [
        [1, 3, 5],
        [2, 4, 6]
    ];

    const opposingAttack = opposingHexes.some(pair =>
        pair.every(hex => attackingHexes.includes(hex))
    );
    const evenlySpacedAttack = evenlySpacedHexes.some(set =>
        set.every(hex => attackingHexes.includes(hex))
    );


    if (opposingAttack || evenlySpacedAttack) {
        return [{type: '4. Concentric attack', value: 1}];
    }

    return [];
}

function moraleBonus() {
    const type = '8. Morale';
    const value = state.assault ? 2 : 1;
    if (state.turn <= 5) {
        if (state.combatDefenderNationality === 'soviet') {
            return [{type, value: -value}]
        } else {
            return [{type, value}]
        }
    }
    if (20 <= state.turn) {
        if (state.combatDefenderNationality === 'finnish') {
            return [{type, value: -value}]
        } else {
            return [{type, value}]
        }
    }
    return [];
}

function armor() {
    const type = '9. Armor';
    if (isOneOfDefenders('armor')) {
        return [{type, value: -1}];
    } else if (isOneOfAttackers('armor')) {
        return [{type, value: 1}];
    }
    return [];
}

function changeOfFinnishOperationalStance() {
    if (state.turn === state.turnMarker.changeOfFinnishOperationalStance) {
        return [{
            type: '10. Change of Finnish Operational Stance',
            value: state.combatDefenderNationality === 'finnish' ? -1 : 1
        }]
    }
    return [];
}

function bonfireBonus() {
    if (state.bonfire) {
        return [{type: '11. Bonfire', value: 2}]
    }
    return [];
}

function sovietMoraleCollapse() {
    if (state.combatDefenderNationality === 'soviet' && state.turnMarker.sovietMoraleCollapse !== undefined) {
        if (state.turn >= state.turnMarker.sovietMoraleCollapse) {
            return [{type: '12. Soviet morale collapse', value: 1}]
        }
    }
    return [];
}

function finnishSMG() {
    if (state.assault && state.map[0] === 'other') {
        return [{
            type: '15. Finnish SMG',
            value: state.combatDefenderNationality === 'finnish' ? -1 : 1
        }]
    }
    return [];
}

export function combatShifts() {
    return [
        ...suppression(),
        ...concentricAttackBonus(),
        ...defenderInLake(),
        ...pajariLeaderBonus(),
        ...defenderDugIn(),
        ...moraleBonus(),
        ...armor(),
        ...changeOfFinnishOperationalStance(),
        ...bonfireBonus(),
        ...sovietMoraleCollapse(),
        ...finnishSMG()
    ];
}
