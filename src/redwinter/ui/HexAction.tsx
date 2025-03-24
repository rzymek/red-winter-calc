import {state} from "../../state.ts";
import {assertNever} from "../../generic/AssertNever.tsx";

export function hexAction(hexIndex: number) {
    console.log({hexIndex})
    if (state.selectedTool === undefined) {
        return;
    } else if (state.selectedTool === 'dugIn') {
        state.dugIn[hexIndex] = !state.dugIn[hexIndex];
    } else if (state.selectedTool === 'bridge') {
        if (hexIndex > 0) {
            state.bridge = state.bridge === hexIndex ? undefined : hexIndex;
        }
    } else if (state.selectedTool === 'suppress') {
        state.suppression[hexIndex] = (state.suppression[hexIndex] + 1) % 4
    } else if (typeof (state.selectedTool) === 'object') {
        const units = state.cs[hexIndex];
        units.push(state.selectedTool);
        if (state.cs[hexIndex].length > 9) {
            units.shift();
        }
    } else if (state.selectedTool === 'terrain') {
        state.map[hexIndex] = state.map[hexIndex] === 'lake' ? 'other' : 'lake';
    } else if (state.selectedTool === 'backspace') {
        state.cs[hexIndex].pop();
    } else {
        assertNever(state.selectedTool);
    }
}