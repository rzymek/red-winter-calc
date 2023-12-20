import {Pick, PickProps} from "./pick.tsx";
import {useContext} from "preact/compat";
import {Context} from "./context.tsx";
import {MultipleSelectionFields, pickManyDefs, pickOneDefs, SingleSelectionFields} from "./state.ts";
import {PickMany} from "./pickMany.tsx";

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

export function PickOneX(props: { field: SingleSelectionFields }) {
    const {label, values} = pickOneDefs[props.field];
    return <PickOne label={label} values={values as (string | number)[]}/>
}

export function PickManyX(props: { field: MultipleSelectionFields } & Partial<PickProps>) {
    const {label, values} = pickManyDefs[props.field];
    return <PickMany label={label} values={values as any} {...props}/>
}
