import {CS, state, Tool} from "../../state.ts";
import {assertNever} from "../../generic/AssertNever.tsx";

function isUnitToolSelected(tool: Tool): tool is CS {
    return typeof (tool) === 'object';
}

export function hexAction(hexIndex: number) {
    if (state.selectedTool === undefined) {
        return;
    } else if (state.selectedTool === 'dugIn') {
        state.dugIn[hexIndex] = !state.dugIn[hexIndex];
        state.map[hexIndex] = 'other';
    } else if (state.selectedTool === 'bridge') {
        if (hexIndex > 0) {
            state.bridge = state.bridge === hexIndex ? undefined : hexIndex;
            state.map[hexIndex] = 'other';
            state.map[0] = 'other';
        }
    } else if (state.selectedTool === 'suppress') {
        state.suppression[hexIndex] = (state.suppression[hexIndex] + 1) % 4
    } else if (isUnitToolSelected(state.selectedTool)) {
        if (state.selectedTool.type === 'pajari') {
            state.cs = state.cs.map(it => it.filter(unit => unit.type !== 'pajari'));
            if (hexIndex === 0) {
                state.combatDefenderNationality = 'finnish';
            } else {
                state.combatDefenderNationality = 'soviet';
            }
        } else if (state.selectedTool.type === 'armor') {
            const selectedUnitCS = state.selectedTool.value;
            state.cs = state.cs.map(it => {
                return it.filter(unit =>
                    !(unit.type === 'armor' && unit.value === selectedUnitCS)
                );
            });
            if (hexIndex === 0) {
                state.combatDefenderNationality = 'soviet';
            } else {
                state.combatDefenderNationality = 'finnish';
            }
        }
        const units = state.cs[hexIndex];
        units.push(state.selectedTool);
        if (state.cs[hexIndex].length > 9) {
            units.shift();
        }
    } else if (state.selectedTool === 'terrain') {
        state.map[hexIndex] = state.map[hexIndex] === 'lake' ? 'other' : 'lake';
        if (state.map[hexIndex] === 'lake' && (state.bridge === hexIndex || hexIndex === 0)) {
            state.bridge = undefined;
        }
    } else if (state.selectedTool === 'backspace') {
        state.cs[hexIndex].pop();
    } else if (state.selectedTool === 'rat') {
        state.rat.targetHex = hexIndex;
    } else {
        assertNever(state.selectedTool);
    }
}