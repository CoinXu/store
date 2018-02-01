import { TargetValidator } from "../inter/TargetValidator";
import { ValidatorFunction } from "../inter/ValidatorFunction";
export declare class ValidatorBuffer {
    private buffer;
    constructor();
    add(target: any, key: string, validator: ValidatorFunction, msg: string): ValidatorBuffer;
    get(target: any): TargetValidator;
    destroy(target: any): ValidatorBuffer;
}
