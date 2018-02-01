export interface ValidatorMapFunction<T, U> {
    (model: T): U;
}
