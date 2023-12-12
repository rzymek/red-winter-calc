import './app.css'
import type {PropsWithChildren} from "preact/compat";
import {createContext, useCallback, useContext, useState} from "preact/compat";

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

function Pick(props: PickProps & {
    selected: (string | number)[],
    onClick(v: string | number): void
}) {
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
        {props.values.map(v => {
                return <ToggleButton key={v} value={v}
                                     selected={props.selected.includes(v)}
                                     onClick={() => props.onClick(v)}
                                     minWidth={props.minWidth}/>;
            }
        )}
    </div>
}


function PickOne(props: PickProps) {
    const context = useContext(Context);
    const selected = context.state[props.label] as (string|number);

    return <Pick {...props}
                 selected={[selected]}
                 onClick={(v: string | number) => {
                     context.update({[props.label]: selected===v ? undefined : v});
                 }}/>;
}

function toggle<T>(a: T[], v: T) {
    if(a.includes(v)) {
        return a.filter(i => i !== v)
    }else{
        return [...a, v];
    }
}

function PickMany(props: PickProps & {}) {
    const context = useContext(Context);
    const selected = (context.state[props.label] ?? []) as (number|string)[];

    return <Pick {...props}
                 selected={selected}
                 onClick={(v: string | number) => {
                     context.update({[props.label]: toggle(selected, v)});
                 }}/>;
}

function Section(props: PropsWithChildren<{
    label: string
}>) {
    return <div>
        <div>{props.label}</div>
        {props.children}
    </div>
}

type Value = string | number | undefined | (string|number)[]
const Context = createContext<{
    state: Record<string, Value>,
    update(v: Record<string, Value>): void
}>(null as any);

export function App() {
    const [state, setState] = useState<Record<string, Value>>({});
    console.log(state)
    return <Context.Provider value={{
        state,
        update: useCallback((v) => {
            setState(prev => ({
                ...prev,
                ...v
            }))
        }, [])

    }}>
        <PickOne label='Distance' values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, '13+']}/>
        <Section label="Firerer">
            <PickOne label='Firepower1' values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
            <PickOne label='Firepower2' values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
            <PickOne label='Firepower3' values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}/>
            <PickOne label='Add unit' values={['+']}/>
            <PickOne label='Type' values={['inf', 'low', 'high', 'mortar', 'arty']}/>
            <PickMany label='Env' values={['any sup/par', 'cross fire', 'arty zone', 'smoke']}/>
        </Section>
        <Section label="Target">
            <PickOne label="Steps" values={['1-2', '3-4', '5-7', '8-9', '10-12', '13-19', '20+']}/>
            <PickOne label="Terrain" values={['billiard', 'open', 'partly', 'protective']}/>
            <PickOne label="Posture" values={['move', 'fire', 'dug in']}/>
            <PickMany label="Environment"
                      values={['night', 'illum/twilight', 'road move', 'all sup/par', 'P+2 in hex', 'arty zone', 'smoke']}
                      wrap={true} minWidth='3cm'/>
        </Section>
        <Section label="Morale">
            <PickMany label="Environmen" values={['attacked by sortie', 'unassigned']}/>
            <PickOne label='Unit Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
            <PickOne label='Step Loses' values={[1, 2, 3, 4, 5]}/>
            <PickOne label='Bn Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        </Section>
    </Context.Provider>
}
