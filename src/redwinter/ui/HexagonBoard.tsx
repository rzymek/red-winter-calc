import {useState} from "preact/hooks";
import {Bonfire} from "../graphics/Bonfire.tsx";
import {DugIn} from "../graphics/DugIn.tsx";
import {Assault} from "../graphics/Assault.tsx";
import {Bridge} from "../graphics/Bridge.tsx";
import {viewBox} from "../config.ts";
import {hexPositions} from "./HexPositions.tsx";
import {Counters} from "./Counters.tsx";
import {Hex} from "./Hex.tsx";

export function HexagonBoard() {
    const [selected, setSelected] = useState(0);
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox={viewBox}>
            {hexPositions.map((_, index) => (
                index !== selected &&
                <Hex index={index} key={index} onClick={() => setSelected(index)} type={index < 4 ? 'lake' : 'other'}/>
            ))}
            <Hex index={selected} stroke={'blue'} type={"other"}/>
            <Bonfire/>
            <Bridge/>
            <DugIn/>
            {hexPositions.map((_, index) => (
                <Counters index={index} key={index}/>
            ))}
            <Assault/>
        </svg>
    );
}

