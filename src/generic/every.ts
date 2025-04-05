export function every<T>(predicate: (it: T) => boolean) {
    return (array: T[]) => array.every(predicate);
}