/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { ViewModel } from "./ViewModel"
import { Action } from "../../../inter/Action"
import { NextCallback } from "../../../inter/NextCallback"

export interface Scheduler<T> {
  (this: ViewModel<T>, state: T, action: Action, next: NextCallback<T>): any
}