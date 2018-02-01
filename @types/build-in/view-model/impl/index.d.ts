import { ViewModel } from "./ViewModel";
import { Description } from "../inter/Description";
import { Store } from "../../../core/impl/Store";
export declare type CreatorArg<T, U> = ViewModel<T, U> | Description<T>;
export default function storeViewModelCreator<T, U>(mods: CreatorArg<T, U>[], store: Store<U>): Store<U>;
