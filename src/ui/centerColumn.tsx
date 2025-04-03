import {ComponentChildren} from "preact";
import {CSSProperties} from "preact/compat";

export function CenterColumn(props: { children: ComponentChildren, style?: CSSProperties }) {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 0,
        gap: '1.6mm',
        ...props.style
    }}>
        {props.children}
    </div>
}