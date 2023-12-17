import {Pick, PickProps} from "./pick.tsx";
import {useContext} from "preact/compat";
import {Context} from "./context.tsx";

export function PickOne(props: PickProps) {
    const context = useContext(Context);
    const selected = context.state[props.label] as (string | number);

    return <Pick {...props}
                 selected={[selected]}
                 onClick={(v: string | number) => {
                     if (props.onClick && props.onClick(v) === false) {
                         return;
                     }
                     context.update({[props.label]: selected === v ? undefined : v});
                 }}/>;
}