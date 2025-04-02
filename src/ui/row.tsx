import {ComponentChildren} from "preact";
import {CSSProperties} from "preact/compat";

export function Row(props: { children: ComponentChildren, style?: CSSProperties }) {
    return <div style={{display: 'flex', justifyContent: 'center', gap: '1.6mm', flexWrap: 'wrap', ...props.style}}>
        {props.children}
    </div>
}