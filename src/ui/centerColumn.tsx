import {ComponentChildren} from "preact";

export function CenterColumn(props: { children: ComponentChildren }) {
    return <div style={{flexGrow: 1, flexShrink: 0}}>
        {props.children}
    </div>
}