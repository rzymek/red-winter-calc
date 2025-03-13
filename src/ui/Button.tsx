import {ComponentChildren} from "preact";
import type {CSSProperties} from "preact/compat";

export function Button(props: { children?: ComponentChildren, style?: CSSProperties, disabled?: boolean }) {
    return <button style={{
        border: '1px solid black',
        width: '10mm',
        height: '10mm',
        borderRadius: 3,
        ...props.style,
    }} disabled={props.disabled}>
        {props.children}
    </button>
}