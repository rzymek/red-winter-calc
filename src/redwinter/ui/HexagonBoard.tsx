import {Bonfire} from "../graphics/Bonfire.tsx";
import {DugIn} from "../graphics/DugIn.tsx";
import {Bridge} from "../graphics/Bridge.tsx";
import {viewBox} from "../config.ts";
import {hexPositions} from "./HexPositions.tsx";
import {Counters} from "./Counters.tsx";
import {Hex} from "./Hex.tsx";
import {state} from "../../state.ts";
import {update} from "../../update.ts";
import {map, pipe, sortBy} from 'remeda'


function assertNever(_: never) {

}

function onHexClick(hexIndex: number) {
    if (state.selectedTool === undefined) {
        if (state.selectedHex === hexIndex) {
            state.selectedHex = undefined;
        } else {
            state.selectedHex = hexIndex;
        }
    } else if (state.selectedTool === 'dugIn') {
        state.dugIn[hexIndex] = !state.dugIn[hexIndex];
    } else if (state.selectedTool === 'bridge') {
        if (hexIndex > 0) {
            state.bridge = hexIndex;
        }
    } else if (state.selectedTool === 'suppress') {
        state.suppression[hexIndex] = (state.suppression[hexIndex] + 1) % 4
    } else if (typeof (state.selectedTool) === 'object') {
        state.cs[hexIndex].push(state.selectedTool);
    } else if (state.selectedTool === 'terrain') {
        state.map[hexIndex] = state.map[hexIndex] === 'lake' ? 'other' : 'lake';
    } else if(state.selectedTool === 'backspace') {
        state.cs[hexIndex].pop();
    }else{
        assertNever(state.selectedTool);
    }
}

export function HexagonBoard() {
    const selected = state.selectedHex;

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox={viewBox}>
            {pipe(
                hexPositions,
                map.indexed((_, index) => index),
                sortBy(index => index === selected),
                map(index =>
                    <Hex index={index} key={index}
                         onClick={update(() => onHexClick(index))}
                         stroke={index === selected ? 'blue' : undefined}
                         type={state.map[index]}/>
                ))}
            {state.bonfire && <Bonfire/>}
            {state.dugIn && <DugIn/>}
            {state.bridge !== undefined && <Bridge position={state.bridge}/>}
            {hexPositions.map((_, index) => (
                <Counters index={index} key={index}/>
            ))}
        </svg>
    );
}

