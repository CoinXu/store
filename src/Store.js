/**
 * Created on 28/04/2017.
 * @file 状态管理核心类
 */

import Observable from './Observable'
import { warning, isPureObject, assert, isString, isFunction } from './utils/utils'
import compose  from './utils/compose'

const DefAction = { type: '__INITIALIZE__ACTION__' }



/**
 * @callback StoreMiddleware
 * @param {Object} action
 * @param {Object} state
 * @param {Function} next
 */

/**
 * @class
 * 该类提供状态管理的基本功能。
 * 扩展功能以中间件的方式实现。
 * 该类可观察。
 */

class Store extends Observable {
  constructor () {
    super()
    this.mw = []
    this.state = {}
  }

  /**
   * 初始化时，默认会发出一个初始化的action。
   * 当然用户也可指定。
   * @param {Object} action
   */
  initialize (action = DefAction) {
    this.dispatch(action)
  }

  /**
   * 派发一个行为。
   * 在此处会将所有的`middleware`执行一次。
   * 然后将得到的接果传给观察者。
   * @param action
   * @return {Store}
   */
  dispatch (action) {
    assert(isPureObject(action), 'action must be a pure object')
    warning(isString(action.type), 'type of action must be a string')

    const next = Object.assign({}, this.state)

    compose(this.mw)(
      action, next,
      result => Object.assign(next, result),
      () => {
        this.state = next
        this.onNext(next)
      }
    )
    return this
  }

  /**
   * 添加中间件。
   * 满足`StoreMiddleware`的定义的函数均可以作为一个中间件。
   * 无论该函数是独立的，还是属于某一个类的成员。
   * 或者某一个对象的属性。
   * @param {StoreMiddleware} mw
   * @return {Store}
   */
  use (mw) {
    assert(isFunction(mw), 'Middleware must be composed of functions')
    this.mw.push(mw)
    return this
  }

  /**
   * 获取当存储的 state
   * @return {Object}
   */
  getState () {
    return Object.assign({}, this.state)
  }
}

export default Store
