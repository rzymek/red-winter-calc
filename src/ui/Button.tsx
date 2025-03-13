import {ComponentChildren} from "preact";

export function Button(props: {children?: ComponentChildren}) {
    return <button style={{
        border: '1px solid black',
        width: '10mm',
        height: '10mm',
        borderRadius: 3
    }}>
        {props.children}
    </button>
}