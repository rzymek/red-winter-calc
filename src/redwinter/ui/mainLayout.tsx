import {Map} from "./Map.tsx";
import {SideColumn} from "../../ui/SideColumn.tsx";
import {Row} from "../../ui/row.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {RAT} from "./RAT.tsx";
import {TurnTrack} from "./turnTrack.tsx";
import {CombatStats} from "../calc/combatStats.tsx";
import {TurnMarkersToolbars} from "./turnMarkersToolbars.tsx";
import {IconButtonsToolbar} from "./iconButtonsToolbar.tsx";
import {WideButtonsToolbar} from "./wideButtonsToolbar.tsx";
import {CSUnitSelector} from "./CSUnitSelector.tsx";


export function MainLayout() {
    return <div style={{display: 'flex', flexDirection: 'column', gap: '1.8mm'}}>
        <div style={{display: 'flex', flex: 1}}>
            <CSUnitSelector/>
        </div>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <WideButtonsToolbar/>
            </SideColumn>
            <CenterColumn>
                <Map/>
            </CenterColumn>
            <SideColumn>
                <IconButtonsToolbar/>
            </SideColumn>
        </div>

        <RAT/>

        <CombatStats/>

        <CenterColumn>
            <TurnTrack/>
            <Row>
                <TurnMarkersToolbars/>
            </Row>
        </CenterColumn>
    </div>
}

