import { Action, Next } from '../../interfaces';
export interface ModelScheduler<T> {
    (this: Model<T>, state: T, action: Action, done: (state: Partial<T>) => void): any;
}
export interface ModelDescription<T> {
    name: string;
    state: T;
    scheduler: ModelScheduler<T>;
}
export default class Model<T> {
    protected name: string;
    protected scheduler: ModelScheduler<T>;
    protected state: T;
    constructor(desc: ModelDescription<T>);
    receiver(action: Action, storeState: any, next: Next<any>): Model<T>;
    done(state: Partial<T>, next: Next<any>): Model<T>;
    static isModel<T>(ins: any): ins is Model<T>;
}
