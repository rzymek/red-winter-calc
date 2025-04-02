const crt = `
Roll 2d6 | 1:4  | 1:3  | 1:2  | 1:1  | 2:1  | 3:1  | 4:1  | 5:1  | 6:1
---------|------|------|------|------|------|------|------|------|------
2        | 5/0  | 4/0  | 4/0  | 3/0  | 3/0  | 2/0  | 2/0  | 2/1  | 1/0
3        | 4/0  | 4/0  | 3/0  | 3/0  | 2/0  | 2/0  | 2/1  | 1/0  | 1/1
4        | 4/0  | 3/0  | 3/0  | 2/0  | 1/0  | 2/1  | 1/0  | 1/1  | 0/1
5        | 3/0  | 3/0  | 2/0  | 2/0  | 2/1  | 1/0  | 1/1  | 0/1  | 0/2
6        | 3/0  | 2/0  | 2/0  | 2/1  | 1/0  | 1/1  | 0/1  | 0/2  | 0/3
7        | 2/0  | 2/0  | 2/1  | 1/0  | 1/1  | 0/1  | 0/2  | 0/3  | 0/4
8        | 2/0  | 2/1  | 1/0  | 1/1  | 0/1  | 0/2  | 0/3  | 0/4  | 0/4
9        | 2/1  | 1/0  | 1/1  | 0/1  | 1/2  | 0/3  | 0/4  | 0/4  | 0/5
10       | 1/0  | 1/1  | 0/1  | 1/2  | 0/2  | 0/4  | 0/4  | 0/5  | 0/6
11       | 1/1  | 0/1  | 1/2  | 0/2  | 0/3  | 0/4  | 0/5  | 0/6  | 0/7
12       | 0/1  | 1/2  | 0/2  | 0/3  | 0/4  | 0/5  | 0/6  | 0/7  | 0/8
`

const crtBy2d6 = crt.split('\n')
    .slice(3)
    .map(line => line.trim())
    .filter(line => line)// Skip the header row
    .map(line =>
        line.split('|')
            .slice(1)
            .map(cell => cell.trim())
            .map(cell => cell.split('/').map(Number))
            .map(([attacker, defender]) => ({attacker, defender}))
    )

export function combatResult(roll2d6: number, ratio: string) {
    return crtBy2d6[roll2d6 - 2][ratios.indexOf(ratio)];
}

const ratios = crt
    .split('\n')[1] // Get the header row
    .split('|') // Split the header by '|'
    .slice(1) // Ignore the first content (column title "Roll 2d6")
    .map((value) => value.trim())
    .filter((value) => value !== '');


export function shiftRatio(baseRatio: string, shift: number) {
    const normalisedRatio = baseRatio.split(':')
        .map(Number)
        .map((val, idx) => Math.max(1, Math.min(val, idx === 0 ? 6 : 4))
        ).join(':');
    const baseIndex = ratios.indexOf(normalisedRatio); // Find the index of the base ratio
    let newIndex = baseIndex + shift; // Calculate the shifted index
    if (newIndex < 0) {
        newIndex = 0; // Clamp to the minimum index
    } else if (newIndex >= ratios.length) {
        newIndex = ratios.length - 1; // Clamp to the maximum index
    }
    return ratios[newIndex]; // Return the shifted ratio
}