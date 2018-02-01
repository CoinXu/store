import { ValidatorFunction } from "../inter/ValidatorFunction";
import { ValidatorDecorate } from "../inter/ValidatorDecorate";
export declare function wrap(validator: ValidatorFunction, msg: string): ValidatorDecorate;
export declare function template(temp: string, values: {
    [key: string]: any;
}): string;
