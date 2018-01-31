import { Store } from "../../../impl/Store";
import { Action } from "../../../inter/Action";
import { Collection } from "./Collection";
import { CollectionState } from "./CollectionState";
export interface Scheduler<T> {
    (this: Store<any>, action: Action, colect: Collection<T>, next: (props?: Partial<CollectionState<T>>) => any): any;
}
