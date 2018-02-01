import { Action } from "../../../core/inter/Action";
import { NextCallback } from "../../../core/inter/NextCallback";
import { Validator } from "./Validator";
export interface Scheduler<T> {
    (action: Action, model: Validator<T>, next: NextCallback<T>): void;
}
