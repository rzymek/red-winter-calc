import {DiceInput} from "./diceInput.tsx";
import {useState} from "preact/compat";

export function Input2d6(props: {
    disabled?: boolean,
    onRoll(result: readonly [number, number]): void
}) {
    const [value, setValue] = useState<readonly [number, number]>([3, 3])
    if (props.disabled) {
        return <></>
    }
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
    }}>
        <DiceInput value={value[0]} onSelect={v => {
            const r = [v, value[1]] as const;
            setValue(r);
            props.onRoll(r)
        }}/>
        <DiceInput value={value[1]} onSelect={v => {
            const r = [value[0], v] as const;
            setValue(r);
            props.onRoll(r)
        }}/>
    </div>;
}