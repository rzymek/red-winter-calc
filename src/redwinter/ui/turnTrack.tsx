import {range} from "../../generic/range.tsx";
import {Row} from "../../ui/row.tsx";
import {TurnButton} from "./TurnButton.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";

export function TurnTrack() {
    return <>{range(1, 5)
        .map(day => range(7 * day - 8, 7 * day - 2))
        .map(r =>
            <Row>{r.map(v => <TurnButton
                key={v}
                selected={state.turn === v}
                onClick={update(() => state.turn = v)}>
                {v}
            </TurnButton>)}</Row>
        )}</>
}