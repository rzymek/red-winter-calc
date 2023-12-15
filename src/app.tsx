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
            backgroundColor: props.selected ? 'lightblue' : undefined
        }} onClick={props.onClick}>
        {props.value}
    </div>
}

type PickProps = {
    label: string,
    wrap?: boolean,
    values: (string | number)[],
    onClick?(value: string | number): boolean,
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
    }} className="Pick">
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
    const selected = context.state[props.label] as (string | number);

    return <Pick {...props}
                 selected={[selected]}
                 onClick={(v: string | number) => {
                     console.log(props.onClick, v)
                     if (props.onClick && props.onClick(v) === false) {
                         return
                     }
                     context.update({[props.label]: selected === v ? undefined : v});
                 }}/>;
}

function toggle<T>(a: T[], v: T) {
    if (a.includes(v)) {
        return a.filter(i => i !== v)
    } else {
        return [...a, v];
    }
}

function PickMany(props: PickProps & {}) {
    const context = useContext(Context);
    const selected = (context.state[props.label] ?? []) as (number | string)[];

    return <Pick {...props}
                 selected={selected}
                 onClick={(v: string | number) => {
                     if (props.onClick && props.onClick(v) === false) {
                         return
                     }
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

type Value = string | number | undefined | (string | number)[]
const Context = createContext<{
    state: Record<string, Value>,
    update(v: Record<string, Value>): void
}>(null as any);

export function App() {
    const [state, setState] = useState<Record<string, Value>>({});
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
        <PickOne label='Firepower1' values={['+', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onClick={v => {
            if (v === '+') {
                setState(prev => ({
                    ...prev,
                    [`Firepower${Object.keys(prev).filter(it => it.startsWith('Firepower')).length + 1}`]: undefined,
                }))
                return false;
            }
        }}/>
        {Object.keys(state).filter(it => it !== 'Firepower1' && it.startsWith('Firepower')).map(it =>
            <PickOne key={it} label={it} values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onClick={v => {
                if (v === 0) {
                    setState(prev => {
                        const next = {...prev};
                        delete next[it];
                        const firepowers = Object.entries(next)
                            .filter(([name, value]) => name.startsWith('Firepower'))
                            .map(([name, value], index) => ({[`Firepower${index+1}`]: value}))
                            .reduce((acc,val)=>({...acc,...val}),{})
                        const rest = Object.entries(next)
                            .filter(([name, value]) => !name.startsWith('Firepower'))
                            .reduce((acc,val)=>({...acc,...val}),{})
                        return {
                            ...firepowers,
                            ...rest,
                        };
                    })
                    return false;
                }
            }}/>
        )}
        <PickOne label='Firerer Type' values={['inf', 'low', 'high', 'mortar', 'arty']}/>
        <PickMany label='Firerer Env' values={['any sup/par', 'cross fire', 'arty zone', 'smoke']}/>
        <PickOne label="Target Steps" values={['1-2', '3-4', '5-7', '8-9', '10-12', '13-19', '20+']}/>
        <PickOne label="Target Terrain" values={['billiard', 'open', 'partly', 'protective']}/>
        <PickOne label="Target Posture" values={['move', 'fire', 'dug in']}/>
        <PickMany label="Target Environment"
                  values={['night', 'illum/twilight', 'road move', 'all sup/par', 'P+2 in hex', 'arty zone', 'smoke',
                      'attacked by sortie', 'unassigned']}
                  wrap={true} minWidth='3cm'/>
        <PickOne label='Target Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <PickOne label='Target step Loses' values={[1, 2, 3, 4, 5]}/>
        <PickOne label='Target Bn Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
    </Context.Provider>
}
