import {useEffect, useState} from "preact/compat";
import {FireResolutionResult, fireTable} from "./firetable.ts";
import {Roll2D6} from "./Roll2D6.tsx";
import {fireResolution} from "./fire-resolution.tsx";
import {State} from "./state.ts";

export function RollAndResolve(props: {
    state: State
    onResult(result: FireResolutionResult | undefined): void;
}) {
    const [roll, setRoll] = useState<number>(NaN);
    const resolution = fireResolution(props.state);

    const result = isFinite(roll) ? fireTable.result(resolution, roll) : undefined;
    useEffect(() => {
        props.onResult(result);
    }, [result]);
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
            Spotting range: {resolution.spotRange}<br/>
            Firepower: {resolution.firepower}<br/>
            Shift: {resolution.shift}<br/>
            Column: {fireTable.column(resolution)?.label}<br/>
            Effect: <b>{result}</b>
            </span>
        </div>
        <Roll2D6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}