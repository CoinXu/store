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
    target: any;
    validator: {
        [key: string]: ValidatorDesc[];
    };
}
export declare class ValidatorBuffer {
    private buffer;
    constructor();
    add(target: any, key: string, validator: Validator, msg: string): ValidatorBuffer;
    get(target: any): TargetValidator;
    destroy(target: any): ValidatorBuffer;
}
export declare const ValidatorDefaultBuffer: ValidatorBuffer;
export interface ValidatorDecorate {
    (target: any, key: string, descriptor?: any): any;
}
export declare function decorate(validator: Validator, msg: string): ValidatorDecorate;
