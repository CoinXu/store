import Collection from "./Collection";
import { Action } from "../../interfaces";
import Store from "../../Store";
export interface CollectionState<T> {
    list: T[];
    [key: string]: any;
}
export interface CollectionScheduler<T> {
    (this: Store<any>, action: Action, colect: Collection<T>, next: (props?: Partial<CollectionState<T>>) => any): any;
}
export interface CollectionDesc<T> {
    name: string;
    primaryKey: keyof T;
    scheduler: CollectionScheduler<T>;
}
export default function <T>(desc: CollectionDesc<T>, store: Store<any>): Store<any>;
