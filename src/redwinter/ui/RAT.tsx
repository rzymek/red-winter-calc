import {SideColumn} from "../../ui/SideColumn.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {Row} from "../../ui/row.tsx";
import {range} from "../../generic/range.tsx";
import {Button} from "../../ui/Button.tsx";
import {RATFirer, state} from "../../state.ts";
import {update} from "../../update.ts";
import {ratDRM} from "../calc/rat.ts";
import {getLOS, getTimeOfDay} from "./timeOfDay.tsx";
import {Checkbox} from "./Checkbox.tsx";

function RATCheckbox(props: { value: keyof typeof state.rat.modifiers, children: string, disabled?: boolean }) {
    const {modifiers} = state.rat;
    return <Checkbox disabled={props.disabled}
                     checked={modifiers[props.value]}
                     onClick={update(() => modifiers[props.value] = !modifiers[props.value])}>
        {props.children}
    </Checkbox>
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
        <th>{props.children}</th>
        <td>{props.need}+</td>
        <th>{probability2d6(props.need)}</th>
    </tr>
}

function RATFirerSelector(props: { disabled?: boolean }) {
    const options: RATFirer[] = [
        'MG', 'mortar', 'infantry', 'arty', 'IG', 'armored',
    ];
    return <select {...props} onChange={e => update(() =>
        state.rat.firer = (e.target as any).value)}>
        {options.map(o =>
            <option key={o}>{o}</option>
        )}
    </select>;
}

export function RAT() {
    const noRAS = getTimeOfDay(state.turn) === 'night';
    const drm = ratDRM();
    return <div style={{
        border: '2px solid #aaa',
        borderRadius: 8,
        position: 'relative',
        padding: 8,
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
                <RATFirerSelector disabled={noRAS}/>
                <RATCheckbox value='selfSpotting' disabled={noRAS}>self spotting</RATCheckbox>
                <RATCheckbox value='nonAdjacentSpotter' disabled={noRAS}>non-adj.spotter</RATCheckbox>
                <RATCheckbox value='longRange' disabled={noRAS}>range 3+</RATCheckbox>
            </SideColumn>
            <CenterColumn>
                <Row>
                    <table style={{minWidth: '60%'}} class="rat">
                        <tbody>
                        <tr>
                            <th>LOS:</th>
                            <td colSpan={2}>{getLOS(state.turn)}</td>
                        </tr>
                        <RATResult need={14 - drm}>Suppressed</RATResult>
                        <RATResult need={17 - drm}>Supp. -1 step</RATResult>
                        <RATResult need={19 - drm}>Supp. -2 step</RATResult>
                        </tbody>
                    </table>
                </Row>
                <Row>{range(1, 4).map(v => <RATButton disabled={noRAS}>{v}</RATButton>)}</Row>
                <Row>{range(5, 8).map(v => <RATButton disabled={noRAS}>{v}</RATButton>)}</Row>
            </CenterColumn>
        </div>
    </div>
}

function RATButton(props: { children: number, disabled?: boolean }) {
    return <Button selected={state.selectedTool === 'rat' && state.rat.rs === props.children}
                   {...props}
                   onClick={update(() => {
                       state.selectedTool = 'rat';
                       state.rat.rs = props.children;
                   })}/>
}