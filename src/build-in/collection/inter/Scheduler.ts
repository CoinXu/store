/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { Store } from "../../../core/impl/Store";
import { Action } from "../../../core/inter/Action";
import { Collection } from "./Collection";
import { CollectionState } from "./CollectionState";

export interface Scheduler<T, U = {}> {
  (
    this: Store<any>,
    action: Action,
    colect: Collection<T>,
    next: (props?: Partial<CollectionState<T, U>>) => any
  ): any;
}
