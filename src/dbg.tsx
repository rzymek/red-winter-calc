import {State} from "./state.ts";
import {fireResolution} from "./fire-resolution.tsx";

export function Dbg(props: {
    state: State
}) {
    const resolution = fireResolution(props.state);
    return <pre>
        {JSON.stringify(resolution, null, 1).replace(/"/g, '')}
    </pre>
}