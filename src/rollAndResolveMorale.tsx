import {useState} from "preact/compat";
import {calculateMorale, effectiveMorale} from "./morale.ts";
import {Roll2D6} from "./Roll2D6.tsx";
import {State} from "./state.ts";

export function RollAndResolveMorale(props: { state: State }) {
    const [roll, setRoll] = useState<number>(0)

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <span>
                Effective morale: {effectiveMorale(props.state)}<br/>
                Morale roll: {isFinite(roll) && roll}<br/>
                Effect: <b>{calculateMorale(props.state, roll)}</b>
            </span>
        </div>
        <Roll2D6
            onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}