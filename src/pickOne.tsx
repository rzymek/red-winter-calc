import {Pick, PickProps} from "./pick.tsx";
import {useContext} from "preact/compat";
import {Context} from "./context.tsx";
import {firepowerDef, pickOneDefs, SingleSelectionFields} from "./state.ts";

export function PickOne(props: PickProps & { field: SingleSelectionFields }) {
    const context = useContext(Context);
    const {label, values} = pickOneDefs[props.field];
    const selected = context.state[props.field];

    return <Pick {...props}
                 label={label}
                 values={values}
                 selected={[selected]}
                 onClick={(v: string | number) => {
                     context.update({[props.field]: selected === v ? undefined : v});
                 }}/>;
}

export function PickFirepower(props: PickProps & { index: number }) {
    const context = useContext(Context);
    const {label, values} = firepowerDef(props.index);
    const selected = context.state.firepower[props.index];
    return <Pick {...props}
                 label={label}
                 values={values}
                 selected={[selected]}
                 onClick={(v: '+' | number) => {
                     const firepower = [...context.state.firepower];
                     if (v === '+') {
                         firepower.push(undefined);
                     } else if (v > 0) {
                         firepower[props.index] = v;
                     } else if (v === 0) {
                         firepower.splice(props.index, 1);
                     }
                     context.update({firepower});
                 }}/>;
}
