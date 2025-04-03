import {WButton} from "../../ui/Button.tsx";
import {resetState, state} from "../../state.ts";
import {toggleTool} from "./toggleTool.tsx";
import {update} from "../../update.ts";

export function WideButtonsToolbar() {
    return <>
        <WButton selected={state.selectedTool === 'dugIn'} selectionType='paint'
                 onClick={toggleTool('dugIn')}>
            dug in
        </WButton>
        <WButton selected={state.assault}
                 onClick={update(() => state.assault = !state.assault)}>
            assault
        </WButton>
        <WButton selected={state.selectedTool === 'suppress'}
                 selectionType='paint'
                 onClick={toggleTool('suppress')}>
            suppressed
        </WButton>
        <WButton onClick={update(resetState)}>
            reset
        </WButton>
    </>;
}