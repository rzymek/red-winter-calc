import {ComponentChildren} from "preact";
import type {CSSProperties} from "preact/compat";
import {useState} from "preact/hooks";

function glowShadow(s: number, color: string) {
    return [
        [` ${s}px  ${s}px ${s}px ${color}`],
        [`-${s}px  ${s}px ${s}px ${color}`],
        [`-${s}px -${s}px ${s}px ${color}`],
        [` ${s}px -${s}px ${s}px ${color}`],
    ].join();
}

export function Button(props: { children?: ComponentChildren, style?: CSSProperties, disabled?: boolean }) {
    const [selected, setSelected] = useState(false)
    return <button
        style={{
            width: '10mm',
            height: '10mm',
            boxShadow: selected ? glowShadow(3, '#96191f') : '', // Inset shadow when pressed
            borderRadius: 3,
            ...props.style,
        }}
        disabled={props.disabled}
        selected={selected}
        onClick={() => setSelected(!selected)}
    >
        {props.children}
    </button>
}