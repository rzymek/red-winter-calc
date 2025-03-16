import {hexPositions} from "./HexPositions.tsx";
import {hexSize} from "../config.ts";
import {range} from "remeda";

export function Counters(props: { index: number, onClick?: () => void, stroke?: string }) {
    const pos = hexPositions[props.index];
    return <foreignObject
        x={pos.x - hexSize / 2}
        y={pos.y - (30)}
        width={75}
        height={75}
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        style={{pointerEvents: 'none'}}
    >
        <div style={{
            width: hexSize, height: hexSize, display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 2
        }}>
            {range(1, 6 + 3 + 1 - props.index * 2).map(i =>
                <div style={{
                    background: 'black',
                    color: 'white',
                    padding: '0 3px',
                    outline: '1px solid lightgray',
                    outlineOffset: -1,
                }}>{i}</div>
            )}
        </div>
    </foreignObject>
}