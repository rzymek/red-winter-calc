const colors = {
    finnish: '#85a7d4',
    soviet: '#f19022',
}

export function Suppression({x, y, level, side}: { x: number, y: number, level: number, side: keyof typeof colors }) {
    const levels = [
        'M 5.43686,0.37069 V 7.02444 L 2.27477,3.86237 0.43695,5.70019 6.94391,12.20712 13.5308,5.6202 11.60231,3.69171 8.19215,7.10185 v -6.7866 z',
        'm 5.43686,13.73506 v 6.65375 l -3.16209,-3.16207 -1.83782,1.83782 6.50696,6.50693 6.58689,-6.58692 -1.92849,-1.92849 -3.41016,3.41014 v -6.7866 z',
        'm 5.43686,27.09943 v 6.65375 l -3.16209,-3.16207 -1.83782,1.83782 6.50696,6.50693 6.58689,-6.58692 -1.92849,-1.92849 -3.41016,3.41014 v -6.7866 z',
    ]
    return <g transform={`translate(${x - 39},${y - 20})`}>
        {levels.slice(0, level).map(d => <path
            style={{
                fill: colors[side],
                fillOpacity: 1,
                stroke: '#000000',
                strokeWidth: 0.617939,
                strokeOpacity: 1
            }} d={d}/>
        )}
    </g>

}