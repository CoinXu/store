import { ValidatorDesc } from "./decorate/valid";
export declare class Validator<T extends {
    [key: string]: any;
}> {
    private __message__;
    private __validator__;
    constructor();
    validator(): {
        [key in keyof T]?: ValidatorDesc[];
    };
    validOne(key: keyof T, value: any): string | null;
    valid(values: Partial<T>): {
        [key: string]: string;
    } | null;
    getValid(): {
        [key in keyof T]?: string;
    } | null;
    set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any): {
        [key: string]: string;
    };
    static isValidator<T>(ins: any): ins is Validator<T>;
}
