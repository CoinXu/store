import { Validator } from "./Validator";
import { Action, Next } from "../../interfaces";
import Store from "../../Store";
export interface ValidatorMap<T, U> {
    (model: T): U;
}
export interface StoreValidatorScheduler<T> {
    (action: Action, model: Validator<T>, next: Next<T>): any;
}
export interface StoreValidatorDesc<T> {
    namespace: string;
    model: Validator<T>;
    scheduler: StoreValidatorScheduler<T>;
    map: ValidatorMap<Validator<T>, any>;
}
export default function storeValidatorCreator<T>(desc: StoreValidatorDesc<T>, store: Store<any>): Store<any>;
