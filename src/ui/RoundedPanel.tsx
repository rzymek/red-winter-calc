import {CSSProperties, ReactNode} from "preact/compat";

export function RoundedPanel(props: {
    labelStyle?: CSSProperties,
    label: string,
    style?: CSSProperties,
    children: ReactNode
}) {
    return <div style={{
        border: '2px solid #aaa',
        borderRadius: 8,
        position: 'relative',
        padding: 8,
        ...props.style
    }}>
        <span style={{
            color: '#aaa',
            position: 'absolute',
            top: -12,
            left: 10,
            background: 'lightgray',
            padding: '0 5px',
            ...props.labelStyle
        }}>{props.label}</span>
        {props.children}
    </div>
}