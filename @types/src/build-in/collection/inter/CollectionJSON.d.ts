export interface CollectionJSON<T> {
    models: T[];
    toDelete: T[];
    toUpdate: T[];
    toCreate: T[];
}
