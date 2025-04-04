import {ReactNode} from "preact/compat";

export function Checkbox(props: { children: ReactNode, disabled?: boolean, checked?: boolean, onChange: () => void }) {
    const {children, ...rest} = props;
    return <label><input type="checkbox" {...rest}/>{children}&nbsp;</label>
}