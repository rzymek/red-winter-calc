import {Bonfire} from "../graphics/Bonfire.tsx";
import {DugIn} from "../graphics/DugIn.tsx";
import {Assault} from "../graphics/Assault.tsx";
import {Bridge} from "../graphics/Bridge.tsx";
import {viewBox} from "../config.ts";
import {hexPositions} from "./HexPositions.tsx";
import {Counters} from "./Counters.tsx";
import {Hex} from "./Hex.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";

export function HexagonBoard() {
    const selected = state.selectedHex;
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox={viewBox}>
            {hexPositions.map((_, index) => (
                index !== selected &&
                <Hex index={index} key={index}
                     onClick={update(() => state.selectedHex = index)}
                     type={state.map[index]}/>
            ))}
            {selected !== undefined &&
                <Hex index={selected} stroke={'blue'} type={state.map[selected]}
                     onClick={update(() => state.selectedHex = undefined)}/>
            }
            {state.bonfire && <Bonfire/>}
            {state.bridge && <Bridge/>}
            {state.dugIn && <DugIn/>}
            {hexPositions.map((_, index) => (
                <Counters index={index} key={index}/>
            ))}
            {state.assault && <Assault/>}
        </svg>
    );
}

