import {useState} from "preact/compat";
import {calculateMorale, effectiveMorale} from "./morale.ts";
import {State} from "./state.ts";
import {Input2d6} from "./Input2d6.tsx";

export function RollAndResolveMorale(props: {
    state: State,
    disabled?: boolean,
}) {
    const [roll, setRoll] = useState<number>(33)

    const morale = effectiveMorale(props.state);
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <div style={{
            flex: 1,
            display: 'flex',
            paddingLeft: 5,
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            <span>
                Effective morale: {isFinite(morale) && morale}<br/>
                Morale roll: {isFinite(roll) && roll}<br/>
                Effect: <b>{calculateMorale(props.state, roll)}</b>
            </span>
        </div>
        <Input2d6
            disabled={props.disabled}
            onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}