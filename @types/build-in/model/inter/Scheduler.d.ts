import { Model } from "./Model";
import { Action } from "../../../core/inter/Action";
import { NextCallback } from "../../../core/inter/NextCallback";
export interface Scheduler<T> {
    (this: Model<T>, state: T, action: Action, next: NextCallback<T>): any;
}
