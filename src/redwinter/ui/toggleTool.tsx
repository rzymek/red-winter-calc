import {state, Tool} from "../../state.ts";
import {update} from "../../update.ts";

export function toggleTool(type: Tool) {
    return update(() => {
        if (state.selectedTool === type) {
            state.selectedTool = undefined;
        } else {
            state.selectedTool = type;
        }
    })
}