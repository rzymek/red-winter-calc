import './app.css'
import {useCallback, useState} from "preact/compat";
import {Value} from "./value.tsx";
import {firetable} from "./firetable.tsx";
import {Context} from "./context.tsx";
import {PickOne} from "./pickOne.tsx";
import {PickMany} from "./pickMany.tsx";


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
                            .map(([name, value], index) => ({[`Firepower${index + 1}`]: value}))
                            .reduce((acc, val) => ({...acc, ...val}), {})
                        const rest = Object.entries(next)
                            .filter(([name, value]) => !name.startsWith('Firepower'))
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
        <PickMany label='Firerer Env' values={['any sup/par', 'cross fire', 'arty zone', 'smoke']}/>
        <PickOne label="Target Steps" values={['1-2', '3-4', '5-7', '8-9', '10-12', '13-19', '20+']}/>
        <PickOne label="Target Terrain" values={['billiard', 'open', 'partly', 'protective']}/>
        <PickOne label="Target Posture" values={['move', 'fire', 'dug in']}/>
        <PickMany label="Target Environment"
                  values={['night', 'illum/twilight', 'road move', 'all sup/par', 'P+2 in hex', 'arty zone', 'smoke',
                      'attacked by sortie', 'unassigned']}
                  wrap={true} minWidth='3cm'/>
        <div>
            Firetable: {firetable(state)}
        </div>
        <PickOne label='Target Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
        <PickOne label='Target step Loses' values={[1, 2, 3, 4, 5]}/>
        <PickOne label='Target Bn Morale' values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
    </Context.Provider>
}
