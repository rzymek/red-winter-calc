import {Button} from "../../ui/Button.tsx";

const CSButtonStyles = {
    MG: {
        backgroundColor: 'black',
        color: 'white',
    },
    mortar: {},
    pajari: {},
    armor: {
        backgroundColor: '#c63026',
        color: 'white',
    }
} as const;

export function CSButton(props: { children: number, type?: keyof typeof CSButtonStyles }) {
    return <Button style={props.type ? CSButtonStyles[props.type] : ({})}>
        {props.type === 'mortar' && '('}
        {props.type === 'pajari' ? '🎖️' : props.children}
        {props.type === 'mortar' && ')'}
    </Button>
}