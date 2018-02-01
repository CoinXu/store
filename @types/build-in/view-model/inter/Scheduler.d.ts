import { ViewModel } from "./ViewModel";
import { Action } from "../../../core/inter/Action";
import { NextCallback } from "../../../core/inter/NextCallback";
export interface Scheduler<T> {
    (this: ViewModel<T>, state: T, action: Action, next: NextCallback<T>): any;
}
