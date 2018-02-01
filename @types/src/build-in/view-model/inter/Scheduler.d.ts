import { ViewModel } from "./ViewModel";
import { Action } from "../../../inter/Action";
import { NextCallback } from "../../../inter/NextCallback";
export interface Scheduler<T> {
    (this: ViewModel<T>, state: T, action: Action, next: NextCallback<T>): any;
}
