import { Action } from "./Action";
export interface MiddlewareCombiner<T> {
    (action: Action, state: T, processor: (state: Partial<T>) => void, complete: (action: Action) => void): void;
}
