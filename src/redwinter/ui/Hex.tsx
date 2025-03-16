import {hexPositions} from "./HexPositions.tsx";
import {hexSize} from "../config.ts";
import {Suppression} from "../graphics/Suppression.tsx";

function generateHexPoints(centerX: number, centerY: number, size: number): string {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angleDeg = 60 * i; // Start at -30 degrees to make flat-topped hexagons
        const angleRad = (Math.PI / 180) * angleDeg;
        const x = centerX + size * Math.cos(angleRad);
        const y = centerY + size * Math.sin(angleRad);
        points.push(`${x},${y}`);
    }
    return points.join(' ');
}


const hexColors = {
    lake: '#b0b8f3',
    other: '#82886e',
}

export function Hex(props: { index: number, onClick?: () => void, stroke?: string, type: keyof typeof hexColors }) {
    const pos = hexPositions[props.index];
    return <>
        <polygon
            data-testid={props.index}
            points={generateHexPoints(pos.x, pos.y, hexSize)}
            stroke={props.stroke ?? 'black'}
            fill={hexColors[props.type]}
            style={{cursor: 'pointer', strokeWidth: 3}}
            onClick={() => {
                console.log(props.index);
                props.onClick?.()
            }}
        />
        <Suppression {...pos}
                     level={props.index % 4}
                     side={props.index % 2 === 0 ? 'soviet' : 'finnish'}/>
    </>
}