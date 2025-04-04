import {state} from "../state.ts";

export function defenderLosses(combatResult: { defender: number }) {
    if (state.hotel && state.cs[0].some(cs => cs.type === 'infantry' || cs.type === 'MG')) {
        return Math.max(0, combatResult.defender - 1)
    } else {
        return combatResult.defender;
    }
}