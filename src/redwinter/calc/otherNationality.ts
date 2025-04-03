import {Nationality} from "../../state.ts";

export function otherNationality(nationality: Nationality): Nationality {
    return nationality === 'finnish' ? 'soviet' : 'finnish';
}