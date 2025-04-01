import {SideColumn} from "../../ui/SideColumn.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {Row} from "../../ui/row.tsx";
import {range} from "../../generic/range.tsx";
import {Button} from "../../ui/Button.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";
import {ratDRM} from "../calc/rat.ts";

function Checkbox(props: { value: keyof typeof state.rat.modifiers, children: string }) {
    const {modifiers} = state.rat;
    return <label>
        <input type="checkbox"
               checked={modifiers[props.value]}
               onClick={update(() => modifiers[props.value] = !modifiers[props.value])}/>
        {props.children}
    </label>
}

function probability2d6(need: number) {
    if (need <= 2) return '100%';
    if (need > 12) return '0%';

    const totalOutcomes = 36;
    let successfulOutcomes = 0;
    for (let i = 1; i <= 6; i++) {
        for (let j = 1; j <= 6; j++) {
            if (i + j >= need) {
                successfulOutcomes++;
            }
        }
    }

    return (Math.round((successfulOutcomes / totalOutcomes) * 1000) / 10) + '%';
}

function RATResult(props: { need: number, children: string }) {
    return <tr>
        <td>{props.children}</td>
        <td>{props.need}+</td>
        <td>{probability2d6(props.need)}</td>
    </tr>
}

export function RAT() {
    const drm = ratDRM();
    return <div style={{
        border: '2px solid #aaa',
        borderRadius: 8,
        position: 'relative',
        padding: 8,
        marginBottom: 8,
    }}>
        <span style={{
            color: '#aaa',
            position: 'absolute',
            top: -12,
            left: 10,
            background: 'lightgray',
            padding: '0 5px',
        }}>RAT</span>
        <div style={{
            fontSize: '70%',
            display: 'flex',
        }}>
            <SideColumn>
                <label><input type="radio" checked={!state.rat.modifiers.direct}
                              onClick={update(() => state.rat.modifiers.direct = false)}/> mortar/IG/Arty</label>
                <label><input type="radio" checked={state.rat.modifiers.direct}
                              onClick={update(() => state.rat.modifiers.direct = true)}/> MG/Armor</label>
                <Checkbox value='selfSpotting'>self spotting</Checkbox>
                <Checkbox value='nonAdjacentSpotter'>non-adj.spotter</Checkbox>
                <Checkbox value='longRange'>range 3+</Checkbox>
            </SideColumn>
            <CenterColumn>
                <Row>
                    <table style={{minWidth: '60%'}}>
                        <tbody>
                        <RATResult need={14-drm}>Suppressed</RATResult>
                        <RATResult need={17-drm}>Supp. -1 step</RATResult>
                        <RATResult need={19-drm}>Supp. -2 step</RATResult>
                        <tr>
                            <td>LOS:</td>
                            <td colSpan={2}>3</td>
                        </tr>
                        </tbody>
                    </table>
                </Row>
                <Row>{range(1, 4).map(v => <RATButton>{v}</RATButton>)}</Row>
                <Row>{range(5, 8).map(v => <RATButton>{v}</RATButton>)}</Row>
            </CenterColumn>
        </div>
    </div>
}

function RATButton(props: { children: number }) {
    return <Button selected={state.selectedTool === 'rat' && state.rat.rs === props.children}
                   onClick={update(() => {
                       state.selectedTool = 'rat';
                       state.rat.rs = props.children;
                   })}>
        {props.children}
    </Button>
}