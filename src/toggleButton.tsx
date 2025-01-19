export function ToggleButton(props: {
    value: string | number,
    selected?: boolean,
    onClick(): void,
    minWidth?: string,
}) {
    const size = '11mm';
    return <div
        style={{
            border: 'solid 1px black',
            borderRadius: 3,
            minWidth: props.minWidth ?? size,
            userSelect: 'none',
            height: size,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            whiteSpace: 'wrap',
            overflowX: 'hidden',
            textWrap: 'balance',
            textAlign: 'center',
            fontWeight: 'bold',
            cursor: 'pointer',
            flex: 1,
            backgroundColor: props.selected ? 'lightblue' : undefined
        }} onClick={props.onClick}>
        {props.value}
    </div>
}