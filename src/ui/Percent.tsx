export function Percent(props: { value: number }) {
    return <>{Math.round(props.value * 100)}%</>;
}