import {useState} from "preact/compat";
import {rollD} from "./rollD.tsx";
import {fireTable} from "./firetable.ts";

export function RollAndResolve(props: { firepower: number; spotRange: number; shift: number }) {
    const [roll, setRoll] = useState<number>(0)

    function rollDice() {
        setRoll(NaN);
        setTimeout(() => {
            setRoll(rollD(6) * 10 + rollD(6));
        }, 1000);
    }

    return <div>
        Column: {fireTable.column(props.firepower)?.label}<br/>
        Effect: {fireTable.result(props.firepower, roll)}<br/>
        <button onClick={rollDice}>[{isFinite(roll) ? roll : '...'}]</button>
    </div>;
}