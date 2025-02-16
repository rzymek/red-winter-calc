import {useEffect, useState} from "preact/compat";
import {FireResolutionResult, firetable, fireTable} from "./firetable.ts";
import {fireResolution} from "./fire-resolution.tsx";
import {State} from "./state.ts";
import {Input2d6} from "./Input2d6.tsx";
import {Probabilities} from "./probabilities.tsx";
import {probability} from "./probability.ts";


export function RollAndResolve(props: {
    state: State
    onResult(result: FireResolutionResult | undefined): void;
}) {
    const [roll, setRoll] = useState<number>(33);
    const resolution = fireResolution(props.state);

    const result = isFinite(roll) ? fireTable.result(resolution, roll, props.state) : undefined;
    useEffect(() => {
        props.onResult(result);
    }, [result]);
    return <>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div style={{
                flex: 1,
                display: 'flex',
                padding: 4,
                justifyContent: 'center',
                flexDirection: 'column',
                alignSelf: 'start',
            }}>
                {resolution.noLOS
                    ? <span>No LOS</span>
                    :
                    <span>Spotting range: {resolution.spotRange} {resolution.dbg.spotted &&
                        <b> - Spotted</b>}<br/>
                        {'firepower' in resolution && <>Firepower: {resolution.firepower}<br/></>}
                        {'areaFireRangeShift' in resolution.dbg ? <>
                            Inf firepower: +{resolution.dbg.infFirepowerDistanceBonus}<br/>
                            Area target stacking: {resolution.dbg.areaTargetStacking}<br/>
                            Area fire range: {resolution.dbg.areaFireRangeShift}<br/>
                        </> :<>
                            Point fire range: {resolution.dbg.pointFireRange}<br/>
                            Point fire diff: {resolution.dbg.differential}<br/>
                            Point fire diff shift: {resolution.dbg.differentialShift}<br/>
                        </>}
                        Target terrain/posture: {resolution.dbg.targetTerrainPosture}<br/>
                        Other mods: {resolution.dbg.otherModifiers}<br/>
                        Shift: {resolution.shift}<br/>
                    Column: {fireTable.column(resolution, props.state)?.label}<br/>
                    Effect: <b>{result} ({roll})</b>
                    </span>}
                <Probabilities probabilities={probability(
                    firetable, fireTable.column(resolution, props.state).index,
                    props.state.firererType
                )} accumulate/>

            </div>

            <Input2d6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
        </div>
    </>;
}

