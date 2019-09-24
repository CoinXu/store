import { Scheduler } from "./Scheduler";
export interface Description<T, U = any> {
    name: string;
    primaryKey: keyof T;
    scheduler: Scheduler<T, U>;
}
