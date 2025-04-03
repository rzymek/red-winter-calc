import {Map} from "./Map.tsx";
import {Button, WButton} from "../../ui/Button.tsx";
import {SideColumn} from "../../ui/SideColumn.tsx";
import {range} from "../../generic/range.tsx";
import {Row} from "../../ui/row.tsx";
import {CSButton} from "./CSButton.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {resetState, state} from "../../state.ts";
import {update} from "../../update.ts";
import {toggleTool} from "./toggleTool.tsx";
import {RAT} from "./RAT.tsx";
import {TurnTrack} from "./turnTrack.tsx";
import {CombatStats} from "../calc/combatStats.tsx";
import {Flag} from "../calc/flag.tsx";

const toggleHotel = update(() => {
    state.map[0] = 'other';
    state.hotel = !state.hotel;
})

function toggleTurnMarker(key: keyof typeof state.turnMarker) {
    return update(() => {
        if (state.turnMarker[key] === state.turn) {
            state.turnMarker[key] = undefined;
        } else {
            state.turnMarker[key] = state.turn;
        }
    })
}

export function MainLayout() {
    return <div style={{display: 'flex', flexDirection: 'column', gap: '1.8mm'}}>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <Button onClick={update(() => state.combatDefenderNationality = 'soviet')}
                        selected={state.combatDefenderNationality === 'soviet'}>🇫🇮</Button>
                <Button onClick={update(() => state.combatDefenderNationality = 'finnish')}
                        selected={state.combatDefenderNationality === 'finnish'}>☭</Button>
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
                    <Button selected={state.selectedTool === 'backspace'}
                            selectionType='paint'
                            onClick={toggleTool('backspace')}>⌫</Button>
                </Row>
            </CenterColumn>
        </div>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <WButton selected={state.selectedTool === 'dugIn'} selectionType='paint'
                         onClick={toggleTool('dugIn')}>
                    dug in
                </WButton>
                <WButton selected={state.assault}
                         onClick={update(() => state.assault = !state.assault)}>
                    assault
                </WButton>
                <WButton selected={state.selectedTool === 'suppress'}
                         selectionType='paint'
                         onClick={toggleTool('suppress')}>
                    suppressed
                </WButton>
                <WButton onClick={update(resetState)}>
                    reset
                </WButton>
            </SideColumn>

            <CenterColumn>
                <Map/>
            </CenterColumn>

            <SideColumn>
                <Button selected={state.selectedTool === 'bridge'}
                        selectionType='paint'
                        onClick={toggleTool('bridge')}>)(</Button>
                <Button selected={state.selectedTool === 'terrain'}
                        selectionType='paint'
                        onClick={toggleTool('terrain')}>🌲</Button>
                <Button selected={state.bonfire}
                        onClick={update(() => state.bonfire = !state.bonfire)}>🔥</Button>
                <Button selected={state.hotel}
                        onClick={toggleHotel}>🏚️</Button>
            </SideColumn>
        </div>

        <RAT/>

        <CombatStats/>

        <CenterColumn>
            <TurnTrack/>
            <Row style={{fontSize: '80%'}}>
                <Button onClick={toggleTurnMarker('changeOfFinnishOperationalStance')}
                        style={{width: undefined}}><Flag nationality="finnish"/> Op. Stance changed</Button>
                <Button onClick={toggleTurnMarker('sovietMoraleCollapse')}
                        style={{width: undefined}}>
                    <Flag nationality='soviet'/> Full Inf & MG on map &lt; 12
                </Button>
            </Row>
        </CenterColumn>
    </div>
}

