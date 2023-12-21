import './app.css'
import {useCallback, useState} from "preact/compat";
import {Context} from "./context.tsx";
import {PickFirepower, PickOne} from "./pickOne.tsx";
import {RollAndResolve} from "./rollAndResolve.tsx";
import {RollAndResolveMorale} from "./rollAndResolveMorale.tsx";
import {initialState, State} from "./state.ts";
import {PickMany} from "./pickMany.tsx";
import {isDefined} from "remeda";

export function App() {
    const [state, setState] = useState<State>(initialState);

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

        <RollAndResolve state={state}/>

        <PickOne field="targetMorale"/>
        <PickOne field="targetStepLoses"/>
        <PickOne field="targetBnMorale"/>
        <RollAndResolveMorale state={state}/>
    </Context.Provider>
}
