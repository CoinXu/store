import { CollectionJSON } from "../inter/CollectionJSON";
import { Collection as CollectionInter } from "../inter/Collection";
import { StateSignature } from "../../../inter/StateSignature";
export declare class Collection<T extends StateSignature> implements CollectionInter<T> {
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
    toJSON(): CollectionJSON<T>;
    toString(): string;
}
