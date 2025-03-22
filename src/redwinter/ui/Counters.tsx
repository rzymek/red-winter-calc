import {hexPositions} from "./HexPositions.tsx";
import {hexSize} from "../config.ts";
import {state} from "../../state.ts";
import {CSStyles} from "./CSStyles.tsx";

export function Counters(props: { index: number, onClick?: () => void, stroke?: string }) {
    const pos = hexPositions[props.index];
    return <foreignObject
        x={pos.x - hexSize / 2 - 5}
        y={pos.y - (30)}
        width={75}
        height={75}
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        style={{pointerEvents: 'none'}}
    >
        <div style={{
            width: hexSize+10, height: hexSize, display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 2
        }}>
            {state.cs[props.index].map(cs => <div style={{
                    ...CSStyles[cs.type],
                    padding: '0 3px',
                    outline: '1px solid lightgray',
                    outlineOffset: -1,
                }}>{cs.value}</div>
            )}
        </div>
    </foreignObject>
}