import {SideColumn} from "../../ui/SideColumn.tsx";
import {CenterColumn} from "../../ui/centerColumn.tsx";
import {Row} from "../../ui/row.tsx";
import {range} from "../../generic/range.tsx";
import {Button} from "../../ui/Button.tsx";

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
                <label><input type="radio"/> mortar/IG/Arty</label>
                <label><input type="radio"/> MG/Armor</label>
                <label><input type="checkbox"/> self spotting</label>
                <label><input type="checkbox"/> non-adjacent spotter</label>
                <label><input type="checkbox"/> range 3+</label>
            </SideColumn>
            <CenterColumn>
                <Row>
                    <table style={{minWidth: '6mmm0%'}}>
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
                <Row>{range(1, 4).map(v => <Button>{v}</Button>)}</Row>
                <Row>{range(5, 8).map(v => <Button>{v}</Button>)}</Row>
            </CenterColumn>
        </div>
    </div>
}