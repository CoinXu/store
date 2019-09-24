import { Scheduler } from "./Scheduler";
export interface Description<T, U = any> {
    name: string;
    primaryKey: keyof T;
    state?: U;
    scheduler: Scheduler<T, U>;
}
