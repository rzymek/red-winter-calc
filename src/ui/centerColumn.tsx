import {ComponentChildren} from "preact";

export function CenterColumn(props: { children: ComponentChildren }) {
    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        flexShrink: 0,
        gap: '1.6mm'
    }}>
        {props.children}
    </div>
}