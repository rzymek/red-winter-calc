import {useState} from "preact/compat";
import {fireTable} from "./firetable.ts";
import {Roll2D6} from "./Roll2D6.tsx";
import {fireResolution} from "./fire-resolution.tsx";
import {State} from "./state.ts";

export function RollAndResolve(props: { state: State }) {
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
            Effect: <b>{isFinite(roll) && fireTable.result(resolution.firepower, roll)}</b>
        </div>
        <Roll2D6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}