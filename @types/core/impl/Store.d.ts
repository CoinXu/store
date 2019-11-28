import { AbstractStore } from "./AbstractStore";
import { StateSignature } from "../inter/StateSignature";
import { Action } from "../inter/Action";
import { DispatchCallback } from "../inter/DispatchCallback";
import { Middleware } from "../inter/Middleware";
import { StoreObserver } from "../inter/StoreObserver";
export declare class Store<T extends StateSignature> extends AbstractStore<T> {
    protected mw: Middleware<T>[];
    protected state: T;
    protected observer: StoreObserver<T>[];
    constructor(state?: T);
    initialize(action?: Action): Store<T>;
    dispatch(action: Action | Action[], callback?: DispatchCallback<T>): Store<T>;
    use(mw: Middleware<T>): Store<T>;
    getState(): T;
    subscribe(observer: StoreObserver<T>): Store<T>;
    unsubscribe(observer: StoreObserver<T>): Store<T>;
    private _emit;
    private _dispatch;
    protected one(action: Action, callback?: DispatchCallback<T>): Store<T>;
    protected group(actions: Action[], callback?: DispatchCallback<T>): Store<T>;
}
