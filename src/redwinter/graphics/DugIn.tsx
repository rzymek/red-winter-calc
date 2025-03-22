import {state} from "../../state.ts";

const position = [
    undefined,
    'translate(0,-86.380431)',
    'translate(74.68969,-43.240114)',
    'translate(74.68969,43.555036)',
    'translate(0,86.286989)',
    'translate(-75.31031,42.552482)',
    'translate(-75.31031,-44.457716)',
]

export function DugIn() {
    return <>
        {position
            .filter((_, index) => state.dugIn[index])
            .map((p) => <path
                style={{
                    fill: "#f19022",
                    fillOpacity: 1,
                    stroke: "#000000",
                    strokeWidth: 0.999999,
                    strokeOpacity: 1,
                    pointerEvents: 'none'
                }}
                transform={p}
                d="m 127.26208,178.23048 v 4.2582 h 8.92207 l 2.64154,7.10181 h 22.48574 l 3.06522,-7.12951 h 8.98189 v -4.29339 h -11.91013 l -2.35204,6.98626 h -17.69748 l -2.50005,-6.93293 z"
            />)}
    </>

}