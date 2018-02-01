/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { Model } from "./Model"
import { Action } from "../../../core/inter/Action"
import { NextCallback } from "../../../core/inter/NextCallback"

export interface Scheduler<T> {
  (this: Model<T>, state: T, action: Action, next: NextCallback<T>): any
}
