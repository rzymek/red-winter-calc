import './app.css'
import {useCallback, useState} from "preact/compat";
import {Context} from "./context.tsx";
import {PickFirepower, PickOne} from "./pickOne.tsx";
import {RollAndResolve} from "./rollAndResolve.tsx";
import {RollAndResolveMorale} from "./rollAndResolveMorale.tsx";
import {initialState, State} from "./state.ts";
import {PickMany} from "./pickMany.tsx";
import {isDefined} from "remeda";
import {FireResolutionResult} from "./firetable.ts";

export function App() {
    const [state, setState] = useState<State>(initialState);
    const [result, setResult] = useState<FireResolutionResult>()

    return <Context.Provider value={{
        state,
        update: useCallback((v) => {
            setState(prev => ({
                ...prev,
                ...v
            }))
        }, [])

    }}>
        <PickOne field="distance"/>
        {state.firepower.map((_,idx) =>
            <PickFirepower index={idx} key={idx}/>
        )}
        <PickOne field="firererType"/>
        {(state.firererType === 'inf' && isDefined(state.distance) && state.distance <= 1) &&
            <PickOne field="firererSteps"/>}

        <PickMany field="firererEnv"/>
        <PickOne field="targetSteps"/>
        <PickOne field="targetTerrain"/>
        <PickOne field="targetPosture"/>
        <PickMany field="targetEnv" wrap={true} minWidth='2cm'/>

        <RollAndResolve state={state} onResult={setResult}/>

        <PickOne field="targetMorale"/>
        <PickOne field="targetStepLoses"/>
        <PickOne field="targetBnMorale"/>

        <RollAndResolveMorale state={state} disabled={result === undefined || result === 'No Effect'}/>
    </Context.Provider>
}
