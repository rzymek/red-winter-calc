import {useState} from "preact/compat";
import {fireTable} from "./firetable.ts";
import {Roll2D6} from "./Roll2D6.tsx";

export function RollAndResolve(props: { firepower: number; spotRange: number; shift: number }) {
    const [roll, setRoll] = useState<number>(NaN);

    return <div>
        Column: {fireTable.column(props.firepower)?.label}<br/>
        Effect: {isFinite(roll) && fireTable.result(props.firepower, roll)}<br/>
        <Roll2D6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
    </div>;
}