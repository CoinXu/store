import Model, { ModelDescription } from "./Model";
import Store from "../../Store";
declare function storeModelCreator<T>(mods: Array<Model<T> | ModelDescription<T>>, store: Store<any>): Store<any>;
export default storeModelCreator;
