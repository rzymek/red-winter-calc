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
import {Dbg} from "./dbg.tsx";


function transition(prev: State, next: State) {
    if (next.targetEnv.includes('night') && next.targetEnv.includes('illum / twilight')) {
        if (prev.targetEnv.includes('night')) {
            drop(next.targetEnv, 'night');
        } else if (prev.targetEnv.includes('illum / twilight')) {
            drop(next.targetEnv, 'illum / twilight');
        }
    }
    return next;
}

export function App() {
    const [state, setState] = useState<State>(initialState);
    const [result, setResult] = useState<FireResolutionResult>()

    function distanceColor(distance: number) {
        if (state.firererType !== 'point' || state.pRange === undefined) {
            return undefined;
        } else if (distance < Math.ceil(state.pRange / 2)) {
            return 'lightgreen';
        } else if (distance <= state.pRange) {
            return 'lightseagreen';
        } else if (state.pRange < distance && distance <= state.pRange * 2) {
            return 'lightcoral';
        } else if (distance > state.pRange * 2) {
            return 'gray';
        }
    }

    const rollForMorale = result !== undefined && result !== 'No Effect' && state.firererType !== 'point';
    return <Context.Provider value={{
        state,
        update: useCallback((v) => {
            setState(prev => transition(prev, {
                ...prev,
                ...v
            }))
        }, [])

    }}>
        <PickOne field="firererType"/>
        {state.firererType === 'point' ? <>
            <PickOne field="firererSteps"/>
            <PickOne field="pRange"/>
            <PickOne field="lowestPFire"/>
            <PickOne field="bestPDefence"/>
        </> : <>
            {state.firepower.map((_, idx) =>
                <PickFirepower index={idx} key={idx}/>)}
            {(state.firererType === 'inf' && isDefined(state.distance) && state.distance <= 1) &&
                <PickOne field="firererSteps"/>}
            <PickOne field="targetSteps"/>
        </>}
        <PickOne field="distance" color={distanceColor}/>
        <PickOne field="targetTerrain"/>
        <PickOne field="targetPosture"/>
        <PickMany field="firererEnv"/>
        <PickMany field="targetEnv" wrap={true} minWidth='2cm'/>

        <PickOne field="extraShift"/>
        <Dbg state={state}/>

        <RollAndResolve state={state} onResult={setResult}/>

        {rollForMorale && <>
            <PickOne field="targetMorale"/>
            <PickOne field="targetStepLoses"/>
            <PickOne field="targetBnMorale"/>

            <RollAndResolveMorale state={state}/>
        </>}
    </Context.Provider>
}

function drop<T>(array: T[], value: T) {
    const idx = array.indexOf(value);
    if (idx !== -1) {
        array.splice(idx, 1);
    }
}
