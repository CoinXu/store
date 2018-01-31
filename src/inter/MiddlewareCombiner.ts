/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { Action } from "./Action";

export interface MiddlewareCombiner<T> {
  (action: Action,
   state: T,
   processor: (state: Partial<T>) => void,
   complete: (action: Action) => void): void
}