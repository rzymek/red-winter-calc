import {Nationality} from "../state.ts";

export function Flag(props: { nationality: Nationality }) {
    return <>{props.nationality === 'finnish' ? '🇫🇮' : '☭'}</>
}