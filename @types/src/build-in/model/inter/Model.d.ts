import { Scheduler } from "./Scheduler";
export interface Model<T> {
    name: string;
    scheduler: Scheduler<T>;
    state: T;
}
