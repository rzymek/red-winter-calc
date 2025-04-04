import {WButton} from "../../ui/Button.tsx";
import {resetState, state} from "../state.ts";
import {toggleTool} from "./toggleTool.tsx";
import {update} from "../../update.ts";
import {useRef, useState} from "preact/hooks";

export function WideButtonsToolbar() {
    return <>
        <WButton selected={state.selectedTool === 'dugIn'} selectionType='paint'
                 onClick={toggleTool('dugIn')}>
            dug in
        </WButton>
        <WButton selected={state.selectedTool === 'suppress'}
                 selectionType='paint'
                 style={{fontSize: '80%'}}
                 onClick={toggleTool('suppress')}>
            suppressed
        </WButton>
        <WButton selected={state.assault}
                 onClick={update(() => state.assault = !state.assault)}>
            assault
        </WButton>
        <ResetButton/>
    </>;
}

function ResetButton() {
    const [mode, setMode] = useState<'initial' | 'confirming'>('initial')
    const timeout = useRef<NodeJS.Timeout>()

    function handleClick() {
        if (mode === 'initial') {
            setMode('confirming');
            timeout.current = setTimeout(() => setMode('initial'), 3_000);
        } else if (mode === 'confirming') {
            if (timeout.current !== undefined) {
                clearTimeout(timeout.current)
            }
            update(resetState)();
            setMode('initial');
        }
    }

    function Label() {
        switch (mode) {
            case 'initial':
                return <>reset</>
            case 'confirming':
                return <>really?</>
        }
    }

    return <WButton onClick={handleClick} style={{
        backgroundColor: mode === 'confirming'
            ? '#ff7575'
            : undefined
    }}>
        <Label/>
    </WButton>

}