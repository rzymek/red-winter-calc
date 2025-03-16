import {height, hexSize, width} from "../config.ts";

const centerX = width / 2;
const centerY = height / 2;

const verticalDistance = hexSize * Math.sqrt(3);
const horizontalDistance = hexSize * 1.5;

// Generate hexagons positions (center and 6 surrounding)
export const hexPositions = [
    {x: centerX, y: centerY}, // Center hex
    {x: centerX, y: centerY - verticalDistance}, // Top
    {x: centerX + horizontalDistance, y: centerY - (verticalDistance / 2)}, // Top right
    {x: centerX + horizontalDistance, y: centerY + (verticalDistance / 2)}, // Bottom right
    {x: centerX, y: centerY + verticalDistance}, // Bottom
    {x: centerX - horizontalDistance, y: centerY + (verticalDistance / 2)}, // Bottom left
    {x: centerX - horizontalDistance, y: centerY - (verticalDistance / 2)}, // Top left
];