import { Store } from "../../../impl/Store";
import { Model } from "../../model/inter/Model";
export interface ViewModel<T> extends Model<T> {
    store: Store<any>;
}
