import {SideColumn} from "../../ui/SideColumn.tsx";
import {Button} from "../../ui/Button.tsx";
import {update} from "../../update.ts";
import {state} from "../state.ts";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {Row} from "../../ui/row.tsx";
import {CSButton} from "./CSButton.tsx";
import {range} from "../../generic/range.tsx";
import {toggleTool} from "./toggleTool.tsx";
import {RoundedPanel} from "../../ui/RoundedPanel.tsx";

function AttackerNationality() {
    return <RoundedPanel label="Attack"
                         style={{
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             gap: '1.6mm',
                             minWidth: '12mm',
                         }}
                         labelStyle={{
                             left: 6,
                             fontSize: 14
                         }}>
        <Button onClick={update(() => state.combatDefenderNationality = 'soviet')}
                selected={state.combatDefenderNationality === 'soviet'}>🇫🇮</Button>
        <Button onClick={update(() => state.combatDefenderNationality = 'finnish')}
                selected={state.combatDefenderNationality === 'finnish'}>☭</Button>
    </RoundedPanel>
}

function CSUnitToolbar() {
    return <>
        <Row>
            {[5, 7, 8, 10].map(value => <CSButton cs={{value, type: 'armor'}}/>)}
            <CSButton cs={{value: 1, type: 'mortar'}}/>
            <CSButton cs={{value: 1, type: 'pajari'}}/>
        </Row>
        <Row>{range(1, 5).map(v => <CSButton cs={{value: v, type: 'infantry'}}/>)}</Row>
        <Row>
            {range(1, 4).map(v => <CSButton cs={{value: v, type: 'MG'}}/>)}
            <Button selected={state.selectedTool === 'backspace'}
                    selectionType='paint'
                    onClick={toggleTool('backspace')}>⌫</Button>
        </Row>
    </>;
}

export function TopToolbar() {
    return <>
        <SideColumn>
            <AttackerNationality/>
        </SideColumn>
        <CenterColumn>
            <CSUnitToolbar/>
        </CenterColumn>
    </>;
}