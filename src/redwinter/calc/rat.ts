import {state} from "../../state.ts";
import {pipe, sum} from "remeda";
import {otherNationality} from "./otherNationality.ts";

function numberOfInfantryCompanies(targetHex: number) {
    return state.cs[targetHex].filter(it => it.type === 'infantry').length;
}

function isCenterHex(targetHex: number) {
    return targetHex === 0;
}

function ratTargetNationality(targetHex: number) {
    if (isCenterHex(targetHex)) {
        return state.combatDefenderNationality;
    }
    return otherNationality(state.combatDefenderNationality);
}

function frozenLake(targetHex: number) {
    if (state.map[targetHex] === 'lake') {
        return ratTargetNationality(targetHex) === 'finnish' ? +1 : +2;
    }
    return 0;
}

function indirectSelfSpotting() {
    const {firer, modifiers} = state.rat;
    if (modifiers.selfSpotting) {
        if (firer === 'mortar') {
            return +1;
        } else if (firer === 'IG') {
            return +2;
        }
    }
    return 0;
}

function isIndirectFirer() {
    const {firer} = state.rat;
    const indirectFirer:typeof firer[] = ['mortar','IG','arty'];
    return indirectFirer.includes(firer);
}
function nonAdjacentSpotter() {
    const {modifiers} = state.rat;
    if(modifiers.nonAdjacentSpotter) {
        if(isIndirectFirer()) {
            return -1;
        }
    }
    return 0;
}

function dugIn(targetHex: number) {
    if(state.dugIn[targetHex]) {
        return isIndirectFirer() ? -1 : -2;
    }
    return 0;
}

function nightTurn() {
    return 0; // TODO
}

function longRange() {
    const {modifiers,firer} = state.rat;
    if(modifiers.longRange) {
        if(firer === 'MG') {
            return -1;
        }else if(firer === 'armored') {
            return -2;
        }
    }
    return 0;
}

export function ratDRM() {
    const {targetHex} = state.rat;
    if (targetHex === undefined) {
        return 0;
    }
    return pipe([
        state.rat.rs,
        numberOfInfantryCompanies(targetHex),
        frozenLake(targetHex),
        indirectSelfSpotting(),
        nonAdjacentSpotter(),
        dugIn(targetHex),
        nightTurn(),
        longRange(),
    ], sum());
}