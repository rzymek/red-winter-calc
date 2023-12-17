import {useState} from "preact/compat";
import {rollD} from "./rollD.tsx";
import {calculateMorale} from "./morale.ts";

export function RollAndResolveMorale(props: { state: Record<string, string | number | (string | number)[]> }) {
    const [roll, setRoll] = useState<number>(0)

    function rollDice() {
        setRoll(NaN);
        setTimeout(() => {
            setRoll(rollD(6) * 10 + rollD(6));
        }, 1000);
    }

    return <div>
        Morale roll: {roll}<br/>
        Morale effect: {calculateMorale(props.state, roll)}<br/>
        <button onClick={rollDice}>[{isFinite(roll) ? roll : '...'}]</button>
    </div>;
}