export function Probabilities({accumulate, probabilities}: {
    probabilities?: Record<string, number>
    accumulate?:boolean,
}) {
    if(!probabilities) {
        return <></>
    }
    let cumulative = Object.entries(probabilities).reverse().reduce((acc, [name, value]) => ({
        sum: acc.sum + value,
        entries: {
            ...acc.entries,
            [name]: acc.sum + value,
        }
    }), {sum: 0, entries: {} as Record<string, number>});
    return <div style={{
        padding: 4,
        marginTop: 4,
        border: 'solid 1px gray',
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridAutoRows: 'auto',
        width: 'fit-content',
        columnGap: 16,
        rowGap: 4,
    }}>
        {Object.keys(probabilities).map(name => <>
            <div key={`${name}-key`}>{name}</div>
            <div key={`${name}-val`}>{(
                (name === 'No Effect' || !accumulate)? probabilities[name] : cumulative.entries[name]
            ).toFixed()}%
            </div>
        </>)}
    </div>
}