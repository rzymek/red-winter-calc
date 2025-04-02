export function Checkbox(props: { children: string, disabled?: boolean, checked?: boolean, onClick: () => void }) {
    const {children, ...rest} = props;
    return <label><input type="checkbox" {...rest}/>{children}&nbsp;</label>
}