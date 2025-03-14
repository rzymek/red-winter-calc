export function glowShadow(s: number, color: string) {
    return [
        [` ${s}px  ${s}px ${s}px ${color}`],
        [`-${s}px  ${s}px ${s}px ${color}`],
        [`-${s}px -${s}px ${s}px ${color}`],
        [` ${s}px -${s}px ${s}px ${color}`],
    ].join();
}