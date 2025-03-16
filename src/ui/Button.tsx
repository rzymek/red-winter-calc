import {ComponentChildren} from "preact";
import type {CSSProperties} from "preact/compat";
import {glowShadow} from "./GlowShadow.tsx";

export function Button(props: {
    children?: ComponentChildren,
    style?: CSSProperties,
    disabled?: boolean,
    selected?: boolean,
    onClick?: () => void,
}) {
    return <button
        style={{
            width: '10mm',
            height: '10mm',
            boxShadow: props.selected ? glowShadow(3, '#96191f') : '', // Inset shadow when pressed
            borderRadius: 3,
            ...props.style,
        }}
        disabled={props.disabled}
        selected={props.selected}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}