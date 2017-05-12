/**
 * Created on 28/04/2017.
 * @file 状态管理核心类
 */

import Observable from './Observable'
import {
  warning, isPureObject, assert,
  isString, isFunction, isArray,
  freeze, noop
} from './utils/utils'
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

  /**
   * @param {object} state
   */
  constructor (state = {}) {
    super()
    this.mw = []
    this.state = { ...state }
  }

  /**
   * 初始化时，默认会发出一个初始化的action。
   * 当然用户也可指定。
   * @param {object} action
   */
  initialize (action = DefAction) {
    this.dispatch(action)
  }

  /**
   * 派发一个行为。
   * 在此处会将所有的`middleware`执行一次。
   * 然后将得到的接果传给观察者。
   * @param {object} action
   * @param {function} callback
   * @private
   * @return {Store}
   */
  dispose (action, callback) {
    warning(isString(action.type), 'type of action must be a string')

    compose(this.mw)(
      action,
      next,
      result => Object.assign(this.state, result),
      () => callback(this.state = freeze(Object.assign({}, next)))
    )
    return this
  }

  /**
   * 派发单个事件
   * @param {object} action
   * @param {function} [callback]
   * @private
   * @return {Store}
   */
  single (action, callback) {
    return this.dispose(action, state => {
      this.onNext(state)
      if (isFunction(callback)) callback(state)
    })
  }

  /**
   * 派发多个事件
   * @param {Array<object>} actions
   * @param {function} [callback]
   * @private
   * @return {Store}
   */
  multiple (actions, callback) {
    const list = actions.map(action => (a, b, next) => this.dispose(action, () => next()))
    compose(list)(null, null, noop, () => {
      this.onNext(this.state)
      if (isFunction(callback)) callback(this.state)
    })
    return this
  }

  /**
   * 派发事件
   * @param {object|Array<Object>} actionOrActions
   * @param {function} [callback]
   */
  dispatch (actionOrActions, callback) {

    if (isPureObject(actionOrActions)) {
      return this.single(actionOrActions, callback)
    }

    if (isArray(actionOrActions) && !actionOrActions.some(action => assert(isPureObject(action), 'action must be a pure object'))) {
      return this.multiple(actionOrActions, callback)
    }

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
   * @return {object}
   */
  getState () {
    return Object.assign({}, this.state)
  }
}

export default Store
