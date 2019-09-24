import { Description } from "../inter/Description";
import { Store } from "../../../core/impl/Store";
export default function <T, U = any>(description: Description<T, U>, store: Store<any>): Store<any>;
