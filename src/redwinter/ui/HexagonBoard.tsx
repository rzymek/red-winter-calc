import {Bonfire} from "../graphics/Bonfire.tsx";
import {DugIn} from "../graphics/DugIn.tsx";
import {Bridge} from "../graphics/Bridge.tsx";
import {viewBox} from "../config.ts";
import {hexPositions} from "./HexPositions.tsx";
import {Counters} from "./Counters.tsx";
import {Hex} from "./Hex.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";
import {hexAction} from "./HexAction.tsx";
import {map, pipe, sortBy} from "remeda";

export function HexagonBoard() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            {pipe(hexPositions,
                map((_, index) => index),
                /* draw selected hex last, so that the selected border
                   is on top of the other hex borders */
                sortBy(index => index === state.rat.targetHex),
                map(index =>
                    <Hex index={index} key={index}
                         stroke={state.rat.targetHex === index ? 'red' : undefined}
                         onClick={update(() => hexAction(index))}
                         type={state.map[index]}/>
                )
            )}
            {state.bonfire && <Bonfire/>}
            {state.dugIn && <DugIn/>}
            {state.bridge !== undefined && <Bridge position={state.bridge}/>}
            {hexPositions.map((_, index) => (
                <Counters index={index} key={index}/>
            ))}
        </svg>
    );
}

