import { Model } from "../../model/impl/Model";
import { ViewModel as ViewModelInter } from "../inter/ViewModel";
import { Scheduler } from "../inter/Scheduler";
import { Description } from "../inter/Description";
import { Store } from "../../../impl/Store";
export declare class ViewModel<T, U> extends Model<T> implements ViewModelInter<T> {
    store: Store<U>;
    scheduler: Scheduler<T>;
    constructor(description: Description<T>, store: Store<U>);
    static isViewModel<T, U>(ins: any): ins is ViewModel<T, U>;
}
