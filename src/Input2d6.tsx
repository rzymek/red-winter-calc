import {DiceInput} from "./diceInput.tsx";
import {useState} from "preact/compat";

export function Input2d6(props: {
    onRoll(result: [number, number]): void
}) {
    const [value, setValue] = useState<[number, number]>([3, 3])

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <DiceInput value={value[0]} onSelect={v => {
            setValue([v, value[1]]);
            props.onRoll([v, value[1]])
        }}/>
        <DiceInput value={value[1]} onSelect={v => {
            setValue([value[0], v]);
            props.onRoll([v, value[1]])
        }}/>
    </div>;
}