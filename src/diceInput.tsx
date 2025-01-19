import {ToggleButton} from "./toggleButton.tsx";
import {range} from "remeda";

export function DiceInput(props: {
    value?: number;
    onSelect(v: number): void
}) {
    return <div style={{
        padding: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
    }}>{
        range(1, 7).map(v =>
            <ToggleButton key={v} selected={props.value === v} value={v} onClick={() => {
                props.onSelect(v);
            }}/>
        )
    }
    </div>
}