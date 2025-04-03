import {Button} from "../../ui/Button.tsx";
import {Flag} from "../calc/flag.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";

export function TurnMarkersToolbars() {
    return <>
        <Button onClick={toggleTurnMarker('changeOfFinnishOperationalStance')}
                style={{width: undefined}}><Flag nationality="finnish"/> Op. Stance changed</Button>
        <Button onClick={toggleTurnMarker('sovietMoraleCollapse')}
                style={{width: undefined}}>
            <Flag nationality='soviet'/> Full Inf & MG on map &lt; 12
        </Button>
    </>;
}

function toggleTurnMarker(key: keyof typeof state.turnMarker) {
    return update(() => {
        if (state.turnMarker[key] === state.turn) {
            state.turnMarker[key] = undefined;
        } else {
            state.turnMarker[key] = state.turn;
        }
    })
}
