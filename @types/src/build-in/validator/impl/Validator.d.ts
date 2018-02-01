import { Descriptor } from "../inter/Descriptor";
import { StateSignature } from "../../../core/inter/StateSignature";
import { Validator as ValidatorInter, ObjectKeysReMapPartial } from "../inter/Validator";
export declare class Validator<T extends StateSignature> implements ValidatorInter<T> {
    private __message__;
    private __validator__;
    constructor();
    validator(): ObjectKeysReMapPartial<T, Descriptor[]>;
    validOne(key: keyof T, value: any): string;
    valid(values: Partial<T>): ObjectKeysReMapPartial<T, string>;
    getValid(): ObjectKeysReMapPartial<T, string>;
    set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any): ObjectKeysReMapPartial<T, string>;
    static isValidator<T>(ins: any): ins is Validator<T>;
}
