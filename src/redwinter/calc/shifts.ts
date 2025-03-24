import {state} from "../../state.ts";
import * as R from "remeda";
import {attackerHexes} from "./attackerHexes.tsx";

type Shift = { type: string, value: number };

function defenderDugIn(): Shift[] {
    if (state.dugIn[0]) {
        return [{type: 'dugIn', value: -1}];
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
        R.filter(attackerHexes),
        R.sum(),
    );
    const suppression = between(-3, defenderSuppression - attackerSuppression, 3);
    if (suppression !== 0) {
        return [{type: 'suppression', value: suppression}]
    }
    return [];
}

function pajariLeaderBonus() {
    const pajariDefending = state.cs[0].some(it => it.type === 'pajari');
    if (pajariDefending) {
        return [{type: 'pajari', value: -1}]
    }
    const pajariAttacking = R.pipe(
        state.cs,
        R.filter(attackerHexes),
        R.flat(),
        R.filter(it => it.type === 'pajari'),
        R.hasAtLeast(1)
    )
    if (pajariAttacking) {
        return [{type: 'pajari', value: 1}]
    }
    return [];
}

function bonfireBonus() {
    if (state.bonfire) {
        return [{type: 'bonfire', value: 2}]
    }
    return [];
}

function concentricAttackBonus() {
    const attackingHexes = R.pipe(
        state.cs,
        R.map(R.isNot(R.isEmpty)),
        R.map((hasUnits, index) => hasUnits ? index : 0),
        R.filter(hexIndex => hexIndex !== 0),
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
        console.log({attackingHexes, opposingAttack, evenlySpacedAttack})
        return [{type: 'concentricAttack', value: 1}];
    }

    return [];
}

export function shifts() {
    return [
        ...suppression(),
        ...concentricAttackBonus(),
        ...pajariLeaderBonus(),
        ...defenderDugIn(),
        ...bonfireBonus(),
    ];
}
