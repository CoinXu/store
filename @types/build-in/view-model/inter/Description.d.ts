import { Scheduler } from "./Scheduler";
import { Description as ModelDescription } from "../../model/inter/Description";
export interface Description<T> extends ModelDescription<T> {
    scheduler: Scheduler<T>;
}
