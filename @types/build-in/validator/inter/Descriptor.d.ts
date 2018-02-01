import { ValidatorFunction } from "./ValidatorFunction";
export interface Descriptor {
    msg: string;
    validator: ValidatorFunction;
}
