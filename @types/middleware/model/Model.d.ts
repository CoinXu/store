import { Action, Next } from '../../interfaces';
export interface ModelScheduler<T> {
    (state: T, action: Action, done: (state: Partial<T>) => void): any;
}
export interface ModelDescription<T> {
    name: string;
    state: T;
    scheduler: ModelScheduler<T>;
}
export default class Model<T> {
    private name;
    private scheduler;
    private state;
    constructor(desc: ModelDescription<T>);
    receiver(action: Action, storeState: any, next: Next<any>): this;
    done(state: Partial<T>, next: Next<any>): this;
    static isModel<T>(ins: any): ins is Model<T>;
}
