export function inRange(rollDef: string, roll: number) {
    if (rollDef === undefined || !isFinite(roll)) {
        return false;
    }
    const [from, to = from] = rollDef.split(/[.][.]/).map(it => Number(it));
    return from <= roll && roll <= to;
}

