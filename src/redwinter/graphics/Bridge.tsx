export function Bridge() {
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