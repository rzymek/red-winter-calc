import {Button} from "../../ui/Button.tsx";
import {CSStyles} from "./CSStyles.tsx";
import {CS, state} from "../../state.ts";
import {toggleTool} from "./toggleTool.tsx";
import * as R from 'remeda';

export function CSButton(props: { cs: CS }) {
    return <Button
        selected={R.isShallowEqual(props.cs, state.selectedTool)}
        style={props.cs.type ? CSStyles[props.cs.type] : ({})}
        onClick={toggleTool(props.cs)}
    >
        {props.cs.type === 'mortar' && '('}
        {props.cs.type === 'pajari' ? '🎖️' : props.cs.value}
        {props.cs.type === 'mortar' && ')'}
    </Button>
}