import { Action } from "./Action";
import { StateSignature } from "./StateSignature";
import { NextCallback } from "./NextCallback";
export interface Middleware<T extends StateSignature> {
    (action: Action, state: T, next: NextCallback<T>): void;
}
