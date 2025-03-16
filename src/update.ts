import {rerender} from "./main.tsx";

export function update<T>(fn: () => T): () => T {
    return () => {
        try {
            return fn()
        } finally {
            rerender();
        }
    }
}