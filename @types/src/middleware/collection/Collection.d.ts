export interface CollectionJson<T> {
    models: T[];
    toDelete: T[];
    toUpdate: T[];
    toCreate: T[];
}
export default class Collection<T extends {
    [key: string]: any;
}> {
    private primaryKey;
    private models;
    private toDel;
    private toUpdate;
    private toCreate;
    private cache;
    constructor(primaryKey: keyof T, mods?: T[]);
    reset(mods: T[]): Collection<T>;
    remove(keyOrMod: string | T): Collection<T>;
    update(primaryValue: string, props: Partial<T>): Collection<T>;
    add(mod: T): Collection<T>;
    sort(compare: (a: T, b: T) => number): Collection<T>;
    at(index: number): T | null;
    last(): T;
    find(filter: Partial<T>): T | null;
    get(): T[];
    toJSON(): CollectionJson<T>;
    toString(): string;
}
