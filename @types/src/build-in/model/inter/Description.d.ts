import { Scheduler } from "./Scheduler";
export interface Description<T> {
    name: string;
    state: T;
    scheduler: Scheduler<T>;
}
