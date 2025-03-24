import {range} from "../../generic/range.tsx";
import {Row} from "../../ui/row.tsx";
import {TurnButton} from "./TurnButton.tsx";

export function TurnTrack() {
    return <>{range(1, 5)
        .map(day => range(7 * day - 8, 7 * day - 2))
        .map(r =>
            <Row>{r.map(v => <TurnButton>{v}</TurnButton>)}</Row>
        )}</>
}