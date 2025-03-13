import {ComponentChildren} from "preact";
import type {CSSProperties} from "preact/compat";

export function Button(props: {children?: ComponentChildren, style?: CSSProperties}) {
    return <button style={{
        border: '1px solid black',
        width: '10mm',
        height: '10mm',
        borderRadius: 3,
        ...props.style,
    }}>
        {props.children}
    </button>
}