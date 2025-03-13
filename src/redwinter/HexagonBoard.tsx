const width = 300;
const height = 300;
const viewBox = `0 0 ${width} ${height}`;
const hexSize = 50;
const fill = 'none';

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


export function HexagonBoard() {
    return (
        <svg width={width}
             height={height}
             viewBox={viewBox}
             xmlns="http://www.w3.org/2000/svg">
            {hexPositions.map((pos, index) => (
                <polygon
                    key={index}
                    points={generateHexPoints(pos.x, pos.y, hexSize)}
                    stroke={'black'}
                    fill={fill}
                />
            ))}
        </svg>
    );
}

