/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

import { Scheduler } from "./Scheduler"

export interface Model<T> {
  name: string
  scheduler: Scheduler<T>
  state: T
}