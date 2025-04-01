import {CSSProperties} from "preact/compat";
import {Button} from "../../ui/Button.tsx";
import {getTimeOfDay, TimeOfDay} from "./timeOfDay.tsx";

const TurnButtonColors: Record<TimeOfDay, CSSProperties> = {
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

export function TurnButton(props: { children: number, selected: boolean, onClick: () => void }) {
    const {children, ...buttonProps} = props;
    const turn = children;
    const part = getTimeOfDay(turn);
    return <Button {...buttonProps} style={TurnButtonColors[part]} disabled={turn <= 0}>{
        turn > 0 ? turn : ''
    }</Button>
}
