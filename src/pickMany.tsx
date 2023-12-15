import {Pick, PickProps} from "./pick.tsx";
import {useContext} from "preact/compat";
import {Context} from "./context.tsx";

function toggle<T>(a: T[], v: T) {
    if (a.includes(v)) {
        return a.filter(i => i !== v)
    } else {
        return [...a, v];
    }
}
export function PickMany(props: PickProps & {}) {
    const context = useContext(Context);
    const selected = (context.state[props.label] ?? []) as (number | string)[];

    return <Pick {...props}
                 selected={selected}
                 onClick={(v: string | number) => {
                     if (props.onClick && props.onClick(v) === false) {
                         return
                     }
                     context.update({[props.label]: toggle(selected, v)});
                 }}/>;
}