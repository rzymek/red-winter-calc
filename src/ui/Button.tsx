import {ComponentChildren} from "preact";
import type {CSSProperties} from "preact/compat";
import {glowShadow} from "./GlowShadow.tsx";


export interface ButtonProps {
    children?: ComponentChildren,
    style?: CSSProperties,
    disabled?: boolean,
    selected?: boolean,
    onClick?: () => void,
    selectionType?: 'paint' | 'toggle'
}

const selectionColor: Record<Required<ButtonProps>['selectionType'], string> = {
    paint: '#192a96',
    toggle: '#96191f',
}

export function Button(props: ButtonProps) {
    return <button
        style={{
            display: 'inline-block',
            width: '10mm',
            height: '10mm',
            boxShadow: props.selected ? glowShadow(3, selectionColor[props.selectionType ?? 'toggle']) : '', // Inset shadow when pressed
            borderRadius: 3,
            ...props.style,
        }}
        disabled={props.disabled}
        onClick={props.onClick}
    >
        {props.children}
    </button>
}

export function WButton(props: ButtonProps) {
    return <Button style={{
        ...props.style,
        width: '20mm',
    }} {...props} />
}