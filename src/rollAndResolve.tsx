import {useState} from "preact/compat";
import {fireTable} from "./firetable.ts";
import {Roll2D6} from "./Roll2D6.tsx";
import {Value} from "./value.tsx";
import {fireResolution} from "./fire-resolution.tsx";

export function RollAndResolve(props: {
    state: Record<string, Value>,
}) {
    const [roll, setRoll] = useState<number>(NaN);
    const resolution = fireResolution(props.state);

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <div style={{flex: 1}}>
            Spotting range: {resolution.spotRange}<br/>
            Firepower: {resolution.firepower}<br/>
            Shift: {resolution.shift}<br/>
            Column: {fireTable.column(resolution.firepower)?.label}<br/>
            Effect: {isFinite(roll) && fireTable.result(resolution.firepower, roll)}<br/>
        </div>
        <Roll2D6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}