/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   25/11/2017
 * @description
 */

import { isArray, isFunction, assert } from './utils'
import { Action, Middleware, MiddlewareCompose } from '../interfaces'

/**
 * 按顺序执行一个数组中的函数。
 * 每个函数执行是传入三个参数：
 * + action
 * + state
 * + next
 * @param {Array<Function>} middlewares
 * @return {Function}
 */
export default function <T> (middlewares: Middleware<T>[]): MiddlewareCompose<T> {
  assert(isArray(middlewares), 'To composed must be an Array')

  middlewares.forEach(function (mw: Middleware<T>) {
    assert(isFunction(mw), 'Each item must be a function')
  })

  return function (action: Action,
    state: T,
    processor: (state: Partial<T>) => void,
    complete: (action: Action) => void): void {
    let index: number = -1
    let mw: Middleware<T>

    dispatch(0)

    function dispatch (i: number) {
      assert(i > index, 'next() called multiple times')
      index = i

      if (i === middlewares.length) {
        return complete(action)
      }

      mw = middlewares[i]
      mw(action, state, function (result: Partial<T>) {
        processor(result)
        return dispatch(i + 1)
      })
    }
  }
}