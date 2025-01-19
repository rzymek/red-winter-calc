import {useState} from "preact/compat";
import {calculateMorale, effectiveMorale, moraleTable} from "./morale.ts";
import {State} from "./state.ts";
import {Input2d6} from "./Input2d6.tsx";
import {Probabilities} from "./probabilities.tsx";
import {probability} from "./probability.ts";

export function RollAndResolveMorale(props: {
    state: State,
}) {
    const [roll, setRoll] = useState<number>(33)

    const morale = effectiveMorale(props.state);
    const moraleResult = calculateMorale(props.state, roll);
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
                Effect: <b>{moraleResult.result}</b>
                <Probabilities probabilities={probability(moraleTable, moraleResult.column - 1)}/>
            </span>
        </div>
        <Input2d6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}