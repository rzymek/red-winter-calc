import {ComponentChildren} from "preact";

export function Row(props: { children: ComponentChildren }) {
    return <div style={{display: 'flex', justifyContent: 'center', gap: '1.6mm', flexWrap: 'wrap'}}>
        {props.children}
    </div>
}