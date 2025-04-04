import {ArrayElement} from "../../generic/arrayElement.tsx";

const timeOfDay = [
    'dawn',
    'morning3',
    'morning4',
    'day',
    'day',
    'dusk',
    'night',
] as const;

export type TimeOfDay = ArrayElement<typeof timeOfDay>;

const LOS:Record<TimeOfDay, number> = {
    dawn: 2,
    morning3: 3,
    morning4: 4,
    day: 5,
    dusk: 2,
    night: 1,
}

export function getTimeOfDay(turn: number) {
    return timeOfDay[(turn + 1) % timeOfDay.length];
}

export function getLOS(turn:number) {
    return LOS[getTimeOfDay(turn)];
}