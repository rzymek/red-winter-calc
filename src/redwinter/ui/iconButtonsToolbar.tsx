import {Button} from "../../ui/Button.tsx";
import {state} from "../../state.ts";
import {toggleTool} from "./toggleTool.tsx";
import {update} from "../../update.ts";


const toggleHotel = update(() => {
    state.map[0] = 'other';
    state.hotel = !state.hotel;
})

export function IconButtonsToolbar() {
    return <>
        <Button selected={state.selectedTool === 'bridge'}
                selectionType='paint'
                onClick={toggleTool('bridge')}>)(</Button>
        <Button selected={state.selectedTool === 'terrain'}
                selectionType='paint'
                onClick={toggleTool('terrain')}>🧊</Button>
        <Button selected={state.bonfire}
                onClick={update(() => state.bonfire = !state.bonfire)}>🔥</Button>
        <Button selected={state.hotel}
                onClick={toggleHotel}>🏚️</Button>
    </>;
}