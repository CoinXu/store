import { Store } from "../../../core/impl/Store";
import { StoreValidatorDescription } from "../inter/StoreValidatorDescription";
export default function storeValidatorCreator<T>(description: StoreValidatorDescription<T>, store: Store<any>): Store<any>;
