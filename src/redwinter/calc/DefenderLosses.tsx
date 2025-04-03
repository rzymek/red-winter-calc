import {state} from "../../state.ts";

export function defenderLosses(combatResult: { defender: number }) {
    if (state.hotel) {
        return Math.max(0, combatResult.defender - 1)
    } else {
        return combatResult.defender;
    }
}