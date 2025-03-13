import {useState} from "preact/hooks";

const width = 300;
const height = 300;
const viewBox = `0 0 ${width} ${height}`;
const hexSize = 50;
const fill = 'white';

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
// const colors = {
//     lake: '#eeeff4',
//     other: '#82886e',
// }

function Hex(props: { index: number, onClick?: () => void, stroke?: string }) {
    const pos = hexPositions[props.index];
    return <polygon
        data-testid={props.index}
        points={generateHexPoints(pos.x, pos.y, hexSize)}
        stroke={props.stroke ?? 'black'}
        fill={fill}
        style={{cursor: 'pointer', strokeWidth: 3}}
        onClick={()=>{
            console.log(props.index);
            props.onClick?.()
        }}
    />;
}

export function HexagonBoard() {
    const [selected, setSelected] = useState(0);
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             viewBox={viewBox}>
            {hexPositions.map((_, index) => (
                index !== selected && <Hex index={index} key={index} onClick={() => setSelected(index)}/>
            ))}
            <Hex index={selected} stroke={'blue'}/>
            <Bridge/>
        </svg>
    );
}

function Bridge() {
    return (
        <g transform="matrix(0,0.42,-0.42,0,293,509) translate(-1026,291)" style="pointer-events: none;">
            <polyline
                style="fill:none;stroke:#000;stroke-width:7.5"
                points="3 95 20 63 127 63 143 95"/>
            <polyline
                style="fill:none;stroke:#000;stroke-width:7.5"
                points="3 2 20 34 127 34 143 2"/>
        </g>
    );
}