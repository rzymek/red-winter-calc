import './app.css'
import {useState} from "preact/hooks";
import type {PropsWithChildren} from "preact/compat";

function ToggleButton(props: {
    value: string | number,
    selected?: boolean,
    onClick(): void,
    minWidth?: string,
}) {
    const size = '11mm';
    return <div
        style={{
            border: 'solid 1px black',
            minWidth: props.minWidth ?? size,
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
            backgroundColor: props.selected ? 'lightgray' : undefined
        }} onClick={props.onClick}>
        {props.value}
    </div>
}

type PickProps = {
    label: string,
    wrap?: boolean,
    values: (string | number)[],
    minWidth?: string,
};

function Pick(props: PickProps) {
    const [selected, select] = useState<string | number>();
    return <div style={{
        border: 'solid 1px black',
        overflowX: 'auto',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: props.wrap ? 'wrap' : undefined,
        position: 'relative'
    }}>
        <div style={{
            position: 'absolute',
            inset: 0,
            fontSize: '200%',
            opacity: 0.2,
            pointerEvents: 'none',
            fontWeight: 'bold',
            textAlign: 'center'
        }}>{props.label}</div>
        {props.values.map(v =>
            <ToggleButton key={v} value={v} selected={selected === v} onClick={() => select(v)}
                          minWidth={props.minWidth}/>
        )}
    </div>
}

function PickMany(props: PickProps & {}) {
    return <Pick {...props}/>
}

function Section(props: PropsWithChildren<{
    label: string
}>) {
    return <div>
        <div>{props.label}</div>
        {props.children}
    </div>
}

export function App() {

    return (
        <>
            <Pick label='Distance' values={[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '13+'
            ]}/>
            <Section label="Firerer">
                <Pick label='Firepower' values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
                <Pick label='Firepower' values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
                <Pick label='Firepower' values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
                <Pick label='Add unit' values={['+']} />
                <Pick label='Type' values={['inf', 'low', 'high', 'mortar', 'arty']}/>
                <PickMany label='Type' values={['any sup/par', 'cross fire', 'arty zone', 'smoke']}/>
            </Section>
            <Section label="Target">
                <Pick label="Steps" values={['1-2', '3-4', '5-7', '8-9', '10-12', '13-19', '20+']}/>
                <Pick label="Terrain" values={['billiard', 'open', 'partly', 'protective']}/>
                <Pick label="Posture" values={['move', 'fire', 'dug in']}/>
                <PickMany label="Environment"
                          values={['night', 'illum/twilight', 'road move', 'all sup/par', 'P+2 in hex', 'arty zone', 'smoke']}
                          wrap={true} minWidth='3cm'/>
            </Section>
            <Section label="Morale">
                <PickMany label="Environmen" values={['attacked by sortie', 'unassigned']}/>
                <Pick label='Unit Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
                <Pick label='Step Loses' values={[1, 2, 3, 4, 5]}/>
                <Pick label='Bn Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
            </Section>
        </>
    )
}
