export declare type CollectionState<T, U = Omit<any, "list">> = {
    list: T[];
} & U;
