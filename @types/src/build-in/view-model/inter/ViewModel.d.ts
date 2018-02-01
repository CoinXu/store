import { Store } from "../../../core/impl/Store";
import { Model } from "../../model/inter/Model";
export interface ViewModel<T> extends Model<T> {
    store: Store<any>;
}
