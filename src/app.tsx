import './app.css'
import {useCallback, useState} from "preact/compat";
import {Value} from "./value.tsx";
import {Context} from "./context.tsx";
import {PickManyX, PickOne, PickOneX} from "./pickOne.tsx";
import {RollAndResolve} from "./rollAndResolve.tsx";
import {RollAndResolveMorale} from "./rollAndResolveMorale.tsx";

export function App() {
    const [state, setState] = useState<Record<string, Value>>({
        Firepower1: 5
    });

    return <Context.Provider value={{
        state,
        update: useCallback((v) => {
            setState(prev => ({
                ...prev,
                ...v
            }))
        }, [])

    }}>
        <PickOneX field="distance"/>
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
        <PickOneX field="firererType"/>
        {(state['Firerer Type'] === 'inf' && Number(state.Distance) <= 1) &&
            <PickOneX field="firererSteps"/>}

        <PickManyX field="firererEnv"/>
        <PickOneX field="targetSteps"/>
        <PickOneX field="targetTerrain"/>
        <PickOneX field="targetPosture"/>
        <PickManyX field="targetEnv" wrap={true} minWidth='2cm'/>

        <RollAndResolve state={state}/>

        <PickOneX field="targetMorale"/>
        <PickOneX field="targetStepLoses"/>
        <PickOneX field="targetBnMorale"/>
        <RollAndResolveMorale state={state}/>
        <pre>
            {JSON.stringify(state, null, ' ')}
        </pre>
    </Context.Provider>
}
