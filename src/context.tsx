import {createContext} from "preact/compat";
import {State} from "./state.ts";

export const Context = createContext<{
    state: State,
    update(v: Partial<State>): void
}>(null as any);