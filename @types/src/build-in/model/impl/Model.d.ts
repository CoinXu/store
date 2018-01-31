import { Description } from "../inter/Description";
import { Model as ModelInter } from "../inter/Model";
import { Scheduler } from "../inter/Scheduler";
import { NextCallback } from "../../../inter/NextCallback";
import { Action } from "../../../inter/Action";
import { StateSignature } from "../../../inter/StateSignature";
export declare class Model<T> implements ModelInter<T> {
    name: string;
    scheduler: Scheduler<T>;
    state: T;
    constructor(description: Description<T>);
    receiver(action: Action, storeState: any, next: NextCallback<StateSignature>): Model<T>;
    done(state: Partial<T>, next: NextCallback<StateSignature>): Model<T>;
    static isModel<T>(ins: any): ins is Model<T>;
}
