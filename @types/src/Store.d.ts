import { Action, Middleware, Observer } from './interfaces';
export default class Store<T> {
    protected mw: Middleware<T>[];
    protected state: T;
    protected observer: Observer<T>;
    constructor(state?: T);
    initialize(action?: Action): Store<T>;
    dispatch(actionOrActions: Action | Action[], callback?: Observer<T>): Store<T>;
    protected single(action: Action, callback?: Observer<T>): Store<T>;
    protected multiple(actions: Action[], callback?: Observer<T>): Store<T>;
    private dispose(action, callback);
    use(mw: Middleware<T>): Store<T>;
    getState(): T;
    subscribe(observer: Observer<T>): Store<T>;
}
