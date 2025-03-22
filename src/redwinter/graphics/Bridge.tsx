const positions = [
    undefined,
    "matrix(0,0.42,-0.42,0,293,509) translate(-1026,291)",
    'matrix(-0.34670438,0.23705711,-0.23705711,-0.34670438,221.42113,126.74468)',
    'matrix(-0.35537365,-0.22385167,0.22385167,-0.35537365,200.0957,206.53647)',
    'matrix(0,-0.42,0.42,0,129.19421,222.71726)',
    'matrix(0.35350022,-0.22679857,0.22679857,0.35350022,77.890792,171.94974)',
    'matrix(0.35101317,0.23062903,-0.23062903,0.35101317,100.96485,93.309684)',
]
const borderWidth = 12;
const left = '3 95 20 63 127 63 143 95';
const right = '3 2 20 34 127 34 143 2';
const fill = 'none';

export function Bridge({position}: { position: number}) {
    return <g transform={positions[position]}
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
}