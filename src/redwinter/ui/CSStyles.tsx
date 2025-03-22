export const CSStyles = {
    MG: {
        backgroundColor: 'black',
        color: 'white',
    },
    mortar: {
        backgroundColor: 'yellow',
    },
    infantry:{
        backgroundColor: 'white',
    },
    pajari: {
        backgroundColor: 'lightblue',
    },
    armor: {
        backgroundColor: '#c63026',
        color: 'white',
    }
} as const;

export type CSType = keyof typeof CSStyles;