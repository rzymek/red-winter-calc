export function Flag(props: { nationality: 'finnish' | 'soviet' }) {
    return <>{props.nationality === 'finnish' ? '🇫🇮' : '☭'}</>
}