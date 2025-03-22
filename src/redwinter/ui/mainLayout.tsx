import {HexagonBoard} from "./HexagonBoard.tsx";
import {Button, WButton} from "../../ui/Button.tsx";
import {SideColumn} from "../../ui/SideColumn.tsx";
import {range} from "../../generic/range.tsx";
import {TurnButton} from "./TurnButton.tsx";
import {Row} from "../../ui/row.tsx";
import {CSButton} from "./CSButton.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {HexType, state} from "../../state.ts";
import {update} from "../../update.ts";


function setHexType(type: HexType) {
    return () => {
        if (state.selectedHex === undefined) {
            state.map = state.map.map(_ => type);
        } else {
            return state.map[state.selectedHex] = type;
        }
    };
}

export function MainLayout() {
    return <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <Button>🇫🇮</Button>
                <Button>☭</Button>
            </SideColumn>
            <CenterColumn>
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
            </CenterColumn>
        </div>
        <div style={{display: 'flex', flex: 1}}>
            <SideColumn>
                <WButton selected={state.dugIn} onClick={update(() => state.dugIn = !state.dugIn)}>dug in </WButton>
                <WButton selected={state.assault} onClick={update(() => state.assault = !state.assault)}>
                    assault
                </WButton>
                <WButton
                    onClick={update(() => state.suppression[state.selectedHex ?? 0] = (state.suppression[state.selectedHex ?? 0] + 1) % 4)}>
                    suppressed
                </WButton>
                <Button selected={state.bonfire} onClick={update(() => state.bonfire = !state.bonfire)}>🔥</Button>
            </SideColumn>
            <CenterColumn>
                <HexagonBoard/>
            </CenterColumn>

            <SideColumn>
                <Button selected={state.bridge} onClick={update(() => state.bridge = !state.bridge)}>)(</Button>
                <Button onClick={update(setHexType('lake'))}>🧊</Button>
                <Button onClick={update(setHexType('other'))}>🌲</Button>
                <Button>🏚️</Button>
            </SideColumn>
        </div>
        <div style={{
            border: '2px solid #aaa',
            borderRadius: 8,
            position: 'relative',
            padding: 8,
            marginBottom: 8,
        }}>
        <span style={{
            color: '#aaa',
            position: 'absolute',
            top: -10,
            left: 10,
            background: 'lightgray',
            padding: '0 5px',
        }}>RAT</span>
            <div style={{
                fontSize: '70%',
                display: 'flex',
            }}>
                <SideColumn>
                    <label><input type="radio"/> mortar/IG/Arty</label>
                    <label><input type="radio"/> MG/Armor</label>
                    <label><input type="checkbox"/> self spotting</label>
                    <label><input type="checkbox"/> non-adjacent spotter</label>
                    <label><input type="checkbox"/> range 3+</label>
                </SideColumn>
                <CenterColumn>
                    <Row>
                        <table style={{minWidth:'6mmm0%'}}>
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
                    <Row>{range(1,4).map(v => <CSButton>{v}</CSButton>)}</Row>
                    <Row>{range(5,8).map(v => <CSButton>{v}</CSButton>)}</Row>
                </CenterColumn>
            </div>
        </div>
        <CenterColumn>
            {range(1, 5).map(day => range(7 * day - 8, 7 * day - 2)).map(r =>
                <Row>{r.map(v => <TurnButton>{v}</TurnButton>)}</Row>
            )}
        </CenterColumn>
    </div>
}
