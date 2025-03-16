import {ArrayElement} from "../../generic/arrayElement.tsx";
import {CSSProperties} from "preact/compat";
import {Button} from "../../ui/Button.tsx";

const DayParts = [
    'dawn',
    'morning3',
    'morning4',
    'day',
    'day',
    'dusk',
    'night',
] as const;

const TurnButtonColors: Record<ArrayElement<typeof DayParts>, CSSProperties> = {
    dawn: {
        backgroundColor: '#657d97',
    },
    morning3: {
        backgroundColor: '#7b9aba',
    },
    morning4: {
        backgroundColor: '#96b6e1',
    },
    day: {
        backgroundColor: '#d2e7fd',
    },
    dusk: {
        backgroundColor: `#657d97`,
    },
    night: {
        backgroundColor: '#010720',
        color: 'white',
    }
}

export function TurnButton(props: { children: number }) {
    const day = props.children;
    const part = DayParts[(day + 1) % DayParts.length];
    return <Button style={TurnButtonColors[part]} disabled={day <= 0}>{
        day > 0 ? day : ''
    }</Button>
}
