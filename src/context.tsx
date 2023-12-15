import {createContext} from "preact/compat";
import {Value} from "./value.tsx";

export const Context = createContext<{
    state: Record<string, Value>,
    update(v: Record<string, Value>): void
}>(null as any);