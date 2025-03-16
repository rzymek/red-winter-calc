export type HexType = 'lake' | 'other'

export const state = {
    selectedHex: 0 as number | undefined,
    map: [
        'other',
        'other',
        'other',
        'other',
        'other',
        'other',
        'other',
    ] as HexType[]
}

