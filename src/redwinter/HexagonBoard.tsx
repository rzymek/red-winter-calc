import {useState} from "preact/hooks";
import {range} from "remeda";
import {Bonfire} from "./Bonfire.tsx";
import {Suppression} from "./Suppression.tsx";

const width = 300;
const height = 300;
const viewBox = `0 0 ${width} ${height}`;
const hexSize = 50;

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

// Calculate center of the SVG
const centerX = width / 2;
const centerY = height / 2;

const verticalDistance = hexSize * Math.sqrt(3);
const horizontalDistance = hexSize * 1.5;

// Generate hexagons positions (center and 6 surrounding)
const hexPositions = [
    {x: centerX, y: centerY}, // Center hex
    {x: centerX, y: centerY - verticalDistance}, // Top
    {x: centerX + horizontalDistance, y: centerY - (verticalDistance / 2)}, // Top right
    {x: centerX + horizontalDistance, y: centerY + (verticalDistance / 2)}, // Bottom right
    {x: centerX, y: centerY + verticalDistance}, // Bottom
    {x: centerX - horizontalDistance, y: centerY + (verticalDistance / 2)}, // Bottom left
    {x: centerX - horizontalDistance, y: centerY - (verticalDistance / 2)}, // Top left
];

const hexColors = {
    lake: '#b0b8f3',
    other: '#82886e',
}

function Hex(props: { index: number, onClick?: () => void, stroke?: string, type: keyof typeof hexColors }) {
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

function Counters(props: { index: number, onClick?: () => void, stroke?: string }) {
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

export function HexagonBoard() {
    const [selected, setSelected] = useState(0);
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox={viewBox}>
            {hexPositions.map((_, index) => (
                index !== selected &&
                <Hex index={index} key={index} onClick={() => setSelected(index)} type={index < 4 ? 'lake' : 'other'}/>
            ))}
            <Hex index={selected} stroke={'blue'} type={"other"}/>
            <Bonfire/>
            <Bridge/>
            <DugIn/>
            {hexPositions.map((_, index) => (
                <Counters index={index} key={index}/>
            ))}
            <Assault/>
        </svg>
    );
}

function DugIn() {
    return <path
        style="fill:#f19022;fill-opacity:1;stroke:#000000;stroke-width:0.999999;stroke-opacity:1"
        d="m 127.26208,178.23048 v 4.2582 h 8.92207 l 2.64154,7.10181 h 22.48574 l 3.06522,-7.12951 h 8.98189 v -4.29339 h -11.91013 l -2.35204,6.98626 h -17.69748 l -2.50005,-6.93293 z"
    />
}

function Assault() {
    return <path
        style="opacity:0.572366;fill:#ff0f00;fill-opacity:1;stroke:none;stroke-width:1;stroke-dasharray:none;stroke-opacity:1"
        d="m 125.29217,93.550811 24.69846,24.698469 24.71721,-24.71721 z"
    />
}

function Bridge() {
    const borderWidth = 12;
    const left = '3 95 20 63 127 63 143 95';
    const right = '3 2 20 34 127 34 143 2';
    const fill = 'none';
    return (
        <g transform="matrix(0,0.42,-0.42,0,293,509) translate(-1026,291)"
           style={{pointerEvents: 'none'}}>
            <polyline points={left}
                      style={{fill, stroke: '#fff', strokeWidth: borderWidth}}/>
            <polyline points={left}
                      style={{fill, stroke: '#000', strokeWidth: borderWidth - 4}}/>

            <polyline points={right}
                      style={{fill, stroke: '#fff', strokeWidth: borderWidth}}/>
            <polyline points={right}
                      style={{fill, stroke: '#000', strokeWidth: borderWidth - 4}}/>
        </g>
    );
}