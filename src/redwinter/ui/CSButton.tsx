import {Button} from "../../ui/Button.tsx";
import {CSStyles, CSType} from "./CSStyles.tsx";

export function CSButton(props: { children: number, type?: CSType, onClick?: () => void }) {
    return <Button style={props.type ? CSStyles[props.type] : ({})} onClick={props.onClick}>
        {props.type === 'mortar' && '('}
        {props.type === 'pajari' ? '🎖️' : props.children}
        {props.type === 'mortar' && ')'}
    </Button>
}