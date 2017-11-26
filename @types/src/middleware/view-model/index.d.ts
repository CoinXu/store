import ViewModel, { ViewModelDescription } from "./ViewModel";
import Store from "../../Store";
export default function storeViewModelCreator<T, U>(mods: Array<ViewModelDescription<T> | ViewModel<T>>, store: Store<U>): Store<U>;
