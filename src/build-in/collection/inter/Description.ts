/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { Scheduler } from "./Scheduler";

export interface Description<T, U = any> {
  name: string;
  primaryKey: keyof T;
  state?: U;
  scheduler: Scheduler<T, U>;
}
