import Model from "../model/Model";
import Store from "../../Store";
import { Action } from "../../interfaces";
export interface ViewModelScheduler<T> {
    (this: ViewModel<T>, state: T, action: Action, done: (state: Partial<T>) => void): any;
}
export interface ViewModelDescription<T> {
    name: string;
    state: T;
    scheduler: ViewModelScheduler<T>;
}
export default class ViewModel<T> extends Model<T> {
    store: Store<any>;
    protected scheduler: ViewModelScheduler<T>;
    constructor(desc: ViewModelDescription<T>, store: Store<any>);
    static isViewModel<T>(ins: any): ins is ViewModel<T>;
}
