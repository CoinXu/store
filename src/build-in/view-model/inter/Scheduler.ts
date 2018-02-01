/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { ViewModel } from "./ViewModel"
import { Action } from "../../../core/inter/Action"
import { NextCallback } from "../../../core/inter/NextCallback"

export interface Scheduler<T> {
  (this: ViewModel<T>, state: T, action: Action, next: NextCallback<T>): any
}