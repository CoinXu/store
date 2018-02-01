export interface ValidatorDecorate {
    (target: any, key: string, descriptor?: any): any;
}
