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

export function HexagonBoard() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            {hexPositions.map((_, index) =>
                <Hex index={index} key={index}
                     onClick={update(() => hexAction(index))}
                     type={state.map[index]}/>
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

