import {useState} from "preact/compat";
import {calculateMorale} from "./morale.ts";
import {Roll2D6} from "./Roll2D6.tsx";

export function RollAndResolveMorale(props: { state: Record<string, string | number | (string | number)[]> }) {
    const [roll, setRoll] = useState<number>(0)

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <div style={{flex: 1}}>
            Morale roll: {isFinite(roll) && roll}<br/>
            Morale effect: {calculateMorale(props.state, roll)}<br/>
        </div>
        <Roll2D6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}