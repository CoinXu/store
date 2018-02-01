import { StateSignature } from "../../../core/inter/StateSignature";
import { Descriptor } from "./Descriptor";
export declare type ObjectKeysReMapPartial<T, U> = {
    [K in keyof T]?: U;
};
export interface Validator<T extends StateSignature> {
    validator(): ObjectKeysReMapPartial<T, Descriptor[]>;
    validOne(key: keyof T, value: any): string;
    valid(values: Partial<T>): ObjectKeysReMapPartial<T, string>;
    getValid(): ObjectKeysReMapPartial<T, string>;
    set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any): ObjectKeysReMapPartial<T, string>;
}
