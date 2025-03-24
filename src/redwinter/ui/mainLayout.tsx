import {HexagonBoard} from "./HexagonBoard.tsx";
import {Button, WButton} from "../../ui/Button.tsx";
import {SideColumn} from "../../ui/SideColumn.tsx";
import {range} from "../../generic/range.tsx";
import {Row} from "../../ui/row.tsx";
import {CSButton} from "./CSButton.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";
import {toggleTool} from "./toggleTool.tsx";
import {RAT} from "./RAT.tsx";
import {TurnTrack} from "./turnTrack.tsx";

export function MainLayout() {
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <Button>🇫🇮</Button>
                <Button>☭</Button>
            </SideColumn>
            <CenterColumn>
                <Row>
                    {[5, 7, 8, 10].map(value => <CSButton cs={{value, type: 'armor'}}/>)}
                    <CSButton cs={{value: 1, type: 'mortar'}}/>
                    <CSButton cs={{value: 1, type: 'pajari'}}/>
                </Row>
                <Row>{range(1, 5).map(v => <CSButton cs={{value: v, type: 'infantry'}}/>)}</Row>
                <Row>
                    {range(1, 4).map(v => <CSButton cs={{value: v, type: 'MG'}}/>)}
                    <Button selected={state.selectedTool === 'backspace'} onClick={toggleTool('backspace')}>⌫</Button>
                </Row>
            </CenterColumn>
        </div>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <WButton selected={state.selectedTool === 'dugIn'}
                         onClick={toggleTool('dugIn')}>dug in </WButton>
                <WButton selected={state.assault} onClick={update(() => state.assault = !state.assault)}>
                    assault
                </WButton>
                <WButton selected={state.selectedTool === 'suppress'}
                         onClick={toggleTool('suppress')}>
                    suppressed
                </WButton>
                <Button selected={state.bonfire} onClick={update(() => state.bonfire = !state.bonfire)}>🔥</Button>
            </SideColumn>

            <CenterColumn>
                <HexagonBoard/>
            </CenterColumn>

            <SideColumn>
                <Button selected={state.selectedTool === 'bridge'}
                        onClick={toggleTool('bridge')}>)(</Button>
                <Button selected={state.selectedTool === 'terrain'} onClick={toggleTool('terrain')}>🌲</Button>
                <Button selected={state.hotel}
                        onClick={update(() => state.hotel = !state.hotel)}>🏚️</Button>
            </SideColumn>
        </div>
        <RAT/>
        <CenterColumn>
            <TurnTrack/>
        </CenterColumn>
        <pre>{JSON.stringify(state, null, 1)}</pre>
    </div>
}

