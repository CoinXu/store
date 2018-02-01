import { Scheduler } from "./Scheduler";
export interface Description<T> {
    name: string;
    primaryKey: keyof T;
    scheduler: Scheduler<T>;
}
