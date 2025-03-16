import {HexagonBoard} from "./HexagonBoard.tsx";
import {Button} from "../../ui/Button.tsx";
import {SideColumn} from "../../ui/SideColumn.tsx";
import {range} from "../../generic/range.tsx";
import {TurnButton} from "./TurnButton.tsx";
import {Row} from "../../ui/row.tsx";
import {CSButton} from "./CSButton.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";


export function MainLayout() {
    return <div style={{display: 'flex', flexDirection: 'column', gap: '1.6mm'}}>
        <Row>
            {[5, 7, 8, 10].map(v => <CSButton type='armor'>{v}</CSButton>)}
            <CSButton type='mortar'>{1}</CSButton>
            <CSButton type='pajari'>{1}</CSButton>
        </Row>
        <Row>{range(1, 5).map(v => <CSButton>{v}</CSButton>)}</Row>
        <Row>
            {range(1, 4).map(v => <CSButton type='MG'>{v}</CSButton>)}
            <Button>⌫</Button>
        </Row>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <Button>dug in </Button>
                <Button>assa ult</Button>
                <Button>sup 🡻</Button>
                <Button>🔥</Button>
            </SideColumn>

            <CenterColumn>
                <HexagonBoard/>
            </CenterColumn>

            <SideColumn>
                <Button>)(</Button>
                <Button>🧊</Button>
                <Button>🌲</Button>
                <Button>🏚️</Button>
                <Button>🇫🇮</Button>
                <Button>☭</Button>
            </SideColumn>
        </div>
        {range(1, 5).map(day => range(7 * day - 8, 7 * day - 2)).map(r =>
            <Row>{r.map(v => <TurnButton>{v}</TurnButton>)}</Row>
        )}
    </div>
}
