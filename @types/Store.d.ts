import { Action, Middleware, Observer } from './interfaces';
export default class Store<T> {
    private mw;
    private state;
    private observer;
    constructor(state?: T);
    initialize(action?: Action): this;
    dispatch(actionOrActions: Action | Action[], callback?: Observer<T>): this;
    private single(action, callback?);
    private multiple(actions, callback?);
    private dispose(action, callback);
    use(mw: Middleware<T>): this;
    getState(): any;
    subscribe(observer: Observer<T>): this;
}
