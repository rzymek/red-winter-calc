import {state} from "../../state.ts";

export function mandatoryAttackerLosses(attacker: number) {
    if (state.assault) {
        return attacker;
    } else {
        return attacker > 0 ? 1 : 0;
    }
}