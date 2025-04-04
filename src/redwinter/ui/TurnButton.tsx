import {CSSProperties} from "preact/compat";
import {Button} from "../../ui/Button.tsx";
import {getTimeOfDay, TimeOfDay} from "../calc/timeOfDay.tsx";
import {state} from "../state.ts";
import {filter, keys, map, mergeAll, pipe} from "remeda";
import {nationalityColors} from "./nationalityColors.tsx";

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


function turnMarkers(turn: number) {
    const borderWidth = 5;
    const TurnMarkers: Record<keyof typeof state.turnMarker, CSSProperties> = {
        sovietMoraleCollapse: {
            borderLeftColor: nationalityColors.soviet,
            borderRightColor: nationalityColors.soviet,
            borderLeftWidth: borderWidth,
            borderRightWidth: borderWidth,
        },
        changeOfFinnishOperationalStance: {
            borderTopColor: nationalityColors.finnish,
            borderBottomColor: nationalityColors.finnish,
            borderTopWidth: borderWidth,
            borderBottomWidth: borderWidth,
        }
    }
    const defaultColor = '#888';
    const defaultWidth = 2;
    const defaultStyle = {
        borderStyle: 'solid',
        borderLeftColor: defaultColor,
        borderRightColor: defaultColor,
        borderTopColor: defaultColor,
        borderBottomColor: defaultColor,
        borderLeftWidth: defaultWidth,
        borderRightWidth: defaultWidth,
        borderTopWidth: defaultWidth,
        borderBottomWidth: defaultWidth,
    }
    return {
        ...defaultStyle,
        ...pipe(
            keys(state.turnMarker),
            filter((key) => state.turnMarker[key] === turn),
            map(key => TurnMarkers[key]),
            mergeAll,
        )
    }
}

export function TurnButton(props: { children: number, selected: boolean, onClick: () => void }) {
    const {children, ...buttonProps} = props;
    const turn = children;
    const part = getTimeOfDay(turn);
    return <Button {...buttonProps}
                   style={{
                       ...turnMarkers(turn),
                       ...TurnButtonColors[part]
                   }}
                   disabled={turn <= 0}>{
        turn > 0 ? turn : ''
    }</Button>
}
