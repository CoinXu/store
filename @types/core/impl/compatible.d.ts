export declare function freeze<T extends Object>(obj: T): T;
export declare function assign(object: {
    [key: string]: any;
}, ...otherArgs: any[]): any;
export declare function find<T>(arr: T[], filter: (v: T, index: number, arr: T[]) => boolean): T | undefined;
export declare function filter<T>(arr: T[], filter: (v: T, index: number, arr: T[]) => boolean): T[];
export declare function every<T>(arr: T[], filter: (v: T, index: number, arr: T[]) => boolean): boolean;
export declare function some<T>(arr: T[], iterator: (v: T, i?: number, a?: T[]) => boolean): boolean;
export declare function includes(arr: any[], value: any): boolean;
export declare function map<T, U>(arr: T[], iterator: (v: T, i?: number, a?: T[]) => U): U[];
export declare function keys(obj: {
    [key: string]: any;
}): string[];
