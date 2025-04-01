import {SideColumn} from "../../ui/SideColumn.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {Row} from "../../ui/row.tsx";
import {range} from "../../generic/range.tsx";
import {Button} from "../../ui/Button.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";

function Checkbox(props: { value: keyof typeof state.rat.modifiers, children: string }) {
    const {modifiers} = state.rat;
    return <label>
        <input type="checkbox"
               checked={modifiers[props.value]}
               onClick={update(() => modifiers[props.value] = !modifiers[props.value])}/>
        {props.children}
    </label>
}

export function RAT() {
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
                        <tr>
                            <td>Suppressed:</td>
                            <td>8+</td>
                            <td>75%</td>
                        </tr>
                        <tr>
                            <td>Supp. -1 step:</td>
                            <td>12+</td>
                            <td>3%</td>
                        </tr>
                        <tr>
                            <td>Supp. -2 step:</td>
                            <td>14+</td>
                            <td>0%</td>
                        </tr>
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