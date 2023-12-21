import {Pick, PickProps} from "./pick.tsx";
import {useContext} from "preact/compat";
import {Context} from "./context.tsx";
import {MultipleSelectionFields, pickManyDefs} from "./state.ts";

function toggle<T>(a: T[], v: T) {
    if (a.includes(v)) {
        return a.filter(i => i !== v)
    } else {
        return [...a, v];
    }
}
export function PickMany(props: PickProps & { field: MultipleSelectionFields }) {
    const context = useContext(Context);
    const selected = context.state[props.field];
    const {label, values} = pickManyDefs[props.field];

    return <Pick {...props}
                 selected={selected}
                 label={label}
                 values={values}
                 onClick={(v: string | number) => {
                     context.update({[props.field]: toggle(selected, v)});
                 }}/>;
}