import './app.css'
import {useCallback, useState} from "preact/compat";
import {fireResolution} from "./fire-resolution.tsx";
import {Value} from "./value.tsx";
import {Context} from "./context.tsx";
import {PickOne} from "./pickOne.tsx";
import {PickMany} from "./pickMany.tsx";
import {range} from 'remeda';
import {fireTable} from "./firetable.ts";

function rollD(d: number): number {
    return 1 + Math.floor(Math.random() * d);
}

function RollAndResolve(props: { firepower: number; spotRange: number; shift: number }) {
    const [roll, setRoll] = useState<number>(0)

    function rollDice() {
        setRoll(NaN);
        setTimeout(() => {
            setRoll(rollD(6) * 10 + rollD(6));
        }, 1000);
    }

    return <div>
        Column: {fireTable.column(props.firepower)?.label}<br/>
        Effect: {fireTable.result(props.firepower, roll)}<br/>
        <button onClick={rollDice}>[{isFinite(roll) ? roll : '...'}]</button>
    </div>;
}

export function App() {
    const [state, setState] = useState<Record<string, Value>>({
        Firepower1: 5
    });
    const resolution = fireResolution(state);
    console.log(state);
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
                    [`Firepower${Object.keys(prev).filter(it => it.startsWith('Firepower')).length + 1}`]: undefined
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
                            .filter(([name,]) => name.startsWith('Firepower'))
                            .map(([, value], index) => ({[`Firepower${index + 1}`]: value}))
                            .reduce((acc, val) => ({...acc, ...val}), {})
                        const rest = Object.entries(next)
                            .filter(([name,]) => !name.startsWith('Firepower'))
                            .map(([name, value]) => ({[name]: value}))
                            .reduce((acc, val) => ({...acc, ...val}), {})
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
        {(state['Firerer Type'] === 'inf' && Number(state.Distance) <= 1) &&
            <PickOne label='Firerer Steps' values={range(1, 40 + 1)}/>}

        <PickMany label='Firerer Env' values={['any sup/par', 'cross fire', 'arty zone', 'smoke']}/>
        <PickOne label="Target Steps" values={['1-2', '3-4', '5-7', '8-9', '10-12', '13-19', '20+']}/>
        <PickOne label="Target Terrain" values={['billiard', 'open', 'partly', 'protective']}/>
        <PickOne label="Target Posture" values={['move', 'fire', 'dug in']}/>
        <PickMany label="Target Environment"
                  values={['night', 'illum/twilight', 'road move', 'firing', 'all sup/par', 'P+2 in hex', 'arty zone', 'smoke',
                      'attacked by sortie', 'unassigned']}
                  wrap={true} minWidth='3cm'/>
        <div>
            Spotting range: {resolution.spotRange}<br/>
            Firepower: {resolution.firepower}<br/>
            Shift: {resolution.shift}<br/>
            <RollAndResolve {...resolution}/>
        </div>
        <PickOne label='Target Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <PickOne label='Target step Loses' values={[1, 2, 3, 4, 5]}/>
        <PickOne label='Target Bn Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <pre>
            {JSON.stringify(state, null, ' ')}
        </pre>
    </Context.Provider>
}
