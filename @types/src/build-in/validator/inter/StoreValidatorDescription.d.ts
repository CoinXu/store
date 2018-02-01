import { Validator } from "./Validator";
import { Scheduler } from "./Scheduler";
import { ValidatorMapFunction } from "./ValidatorMapFunction";
export interface StoreValidatorDescription<T> {
    namespace: string;
    model: Validator<T>;
    scheduler: Scheduler<T>;
    map: ValidatorMapFunction<Validator<T>, any>;
}
