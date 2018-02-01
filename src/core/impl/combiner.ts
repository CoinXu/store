/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

import { StateSignature } from "../inter/StateSignature"
import { MiddlewareCombiner } from "../inter/MiddlewareCombiner"
import { Action } from "../inter/Action"
import { Middleware } from "../inter/Middleware"

export default function <T extends StateSignature>(mws: Middleware<T>[]): MiddlewareCombiner<T> {

  return function (action: Action,
                   state: T,
                   processor: (state: Partial<T>) => void,
                   complete: (action: Action) => void): void {

    let point: number = -1
    let mw: Middleware<T>

    dispatch(0)

    function dispatch(i: number): void {
      point = i

      if (i === mws.length) {
        complete(action)
        return
      }

      mw = mws[i]
      mw(action, state, function (result: Partial<T>): void {
        processor(result)
        dispatch(i + 1)
      })
    }
  }
}
