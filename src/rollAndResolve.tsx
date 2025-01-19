import {useEffect, useState} from "preact/compat";
import {FireResolutionResult, fireTable} from "./firetable.ts";
import {fireResolution} from "./fire-resolution.tsx";
import {State} from "./state.ts";
import {Input2d6} from "./Input2d6.tsx";


export function RollAndResolve(props: {
    state: State
    onResult(result: FireResolutionResult | undefined): void;
}) {
    const [roll, setRoll] = useState<number>(33);
    const resolution = fireResolution(props.state);

    const result = isFinite(roll) ? fireTable.result(resolution, roll) : undefined;
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
            }}>
                {resolution.noLOS
                    ? <span>No LOS</span>
                    : <span>
                    Spotting range: {resolution.spotRange}<br/>
                    Firepower: {resolution.firepower}<br/>
                    Shift: {resolution.shift}<br/>
                    Column: {fireTable.column(resolution)?.label}<br/>
                    Effect: <b>{result} ({roll})</b>
                    </span>}
                <Probabilities resolution={resolution}/>

            </div>

            <Input2d6 onRoll={([d1, d2]) => setRoll(d1 * 10 + d2)}/>
        </div>
    </>;
}

function Probabilities(props: {
    resolution: {
        firepower: number;
        shift: number;
        spotRange: number;
        noLOS: boolean
    }
}) {
    const probabilities = fireTable.probability(fireTable.column(props.resolution).index)
    const cumulative = Object.entries(probabilities).reverse().reduce((acc, [name, value]) => ({
        sum: acc.sum + value,
        entries: {
            ...acc.entries,
            [name]: acc.sum + value,
        }
    }), {sum: 0, entries: {} as Record<string, number>});
    return <div style={{
        padding: 4,
        marginTop: 4,
        border: 'solid 1px gray',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridAutoRows: 'auto',
        width: 'fit-content',
        columnGap: 16,
        rowGap: 4,
    }}>
        {Object.keys(probabilities).map(name => <>
            <div key={`${name}-key`}>{name}</div>
            <div key={`${name}-val`}>{(
                name === 'No Effect' ? probabilities[name] : cumulative.entries[name]
            ).toFixed()}%
            </div>
        </>)}
    </div>
}
