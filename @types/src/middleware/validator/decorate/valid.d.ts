export declare const hasOwnProperty: (v: string) => boolean;
export declare function template(temp: string, values: {
    [key: string]: any;
}): string;
export interface Validator {
    (v: any): boolean;
}
export interface ValidatorDesc {
    msg: string;
    validator: Validator;
}
export interface TargetValidator {
    target: object;
    validator: {
        [key: string]: ValidatorDesc[];
    };
}
export declare class ValidatorBuffer {
    private buffer;
    constructor();
    add(target: object, key: string, validator: Validator, msg: string): ValidatorBuffer;
    get(target: object): TargetValidator;
    destroy(target: object): ValidatorBuffer;
}
export declare const ValidatorDefaultBuffer: ValidatorBuffer;
export interface ValidatorDecorate {
    (target: object, key: string, descriptor: any): any;
}
export declare function decorate(validator: Validator, msg: string): ValidatorDecorate;
