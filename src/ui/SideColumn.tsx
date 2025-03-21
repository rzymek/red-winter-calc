import {ComponentChildren} from "preact";

export function SideColumn(props: { children: ComponentChildren }) {
    return (
        <div style={{
            flexShrink: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1.6mm',
        }}>
            {props.children}
        </div>
    );
}