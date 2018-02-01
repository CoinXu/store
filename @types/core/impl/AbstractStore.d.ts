import { StateSignature } from "../inter/StateSignature";
import { Action } from "../inter/Action";
import { DispatchCallback } from "../inter/DispatchCallback";
import { Middleware } from "../inter/Middleware";
import { StoreObserver } from "../inter/StoreObserver";
export declare abstract class AbstractStore<T extends StateSignature> {
    abstract initialize(action?: Action): AbstractStore<T>;
    abstract dispatch(action: Action | Action[], callback?: DispatchCallback<T>): AbstractStore<T>;
    abstract use(mw: Middleware<T>): AbstractStore<T>;
    abstract getState(): T;
    abstract subscribe(observer: StoreObserver<T>): AbstractStore<T>;
}
