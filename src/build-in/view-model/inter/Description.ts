/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { Scheduler } from "./Scheduler"
import { Description as ModelDescription } from "../../model/inter/Description"

export interface Description<T> extends ModelDescription<T> {
  scheduler: Scheduler<T>
}