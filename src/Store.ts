/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   25/11/2017
 * @description
 */

import { Action, Middleware, Observer, Next } from './interfaces'
import { warning, isPureObject, assert, noop, isString, isFunction, isArray, assign } from './utils/utils'
import compose from './utils/compose'

const DefAction: Action = { type: '__INITIALIZE__ACTION__' }

/**
 * 该类提供状态管理的基本功能。
 * 扩展功能以中间件的方式实现。
 * 该类可观察。
 */
export default class Store<T> {
  private mw: Middleware<T>[]
  private state: T
  private observer: Observer<T>

  /**
   * @param {T} state
   */
  constructor (state: T = {} as T) {
    this.mw = []
    // TODO 查看看这种代码应该怎么定义
    // 这写法也是无奈啊
    this.state = <T>{ ...state as Object }
    this.observer = noop
  }

  /**
   * 初始化时，默认会发出一个初始化的action。
   * 当然用户也可指定。
   * @param {Action} [action]
   */
  initialize (action: Action = DefAction) {
    return this.dispatch(action)
  }

  /**
   * 派发事件
   * @param {Action | Action[]} actionOrActions
   * @param {Observer} [callback]
   */
  dispatch (actionOrActions: Action | Action[], callback?: Observer<T>) {
    if (isPureObject<Action>(actionOrActions)) {
      return this.single(actionOrActions, callback)
    }

    if (isArray<Action>(actionOrActions)) {
      actionOrActions.some(action => {
        assert(isPureObject(action), 'action must be a pure object')
        return false
      })
      return this.multiple(actionOrActions, callback)
    }

    return this
  }

  /**
   * 派发单个事件
   * @param {Action} action
   * @param {Observer} [callback]
   * @private
   * @return {Store}
   */
  private single (action: Action, callback?: Observer<T>) {
    return this.dispose(action, (state: T) => {
      this.observer(state)
      if (isFunction(callback)) callback(state)
    })
  }

  /**
   * 派发多个事件
   * @param {Array<Action>} actions
   * @param {Observer} [callback]
   * @private
   * @return {Store}
   */
  private multiple (actions: Action[], callback?: Observer<T>) {
    const mws: Middleware<T>[] = actions.map((action): Middleware<T> => {
      return (a: Action, s: T, next: Next<T>): void => {
        this.dispose(action, (state: T) => next(state))
      }
    })

    compose(mws)(null, null, noop, () => {
      this.observer(this.state)
      if (isFunction<Observer<T>>(callback)) {
        callback(this.state)
      }
    })
    return this
  }

  /**
   * 派发一个行为。
   * 在此处会将所有的`middleware`执行一次。
   * 然后将得到的接果传给观察者。
   * @param {object} action
   * @param {Observer} callback
   * @return {Store}
   * @private
   */
  private dispose (action: Action, callback: Observer<T>) {
    warning(isString(action.type), 'type of action must be a string')

    compose(this.mw)(
      action,
      this.state,
      (result: Partial<T>) => {
        assign(this.state, result)
      },
      () => callback(this.state)
    )
    return this
  }

  /**
   * 添加中间件。
   * 满足`StoreMiddleware`的定义的函数均可以作为一个中间件。
   * 无论该函数是独立的，还是属于某一个类的成员。
   * 或者某一个对象的属性。
   * @param {Middleware} mw
   * @return {Store}
   */
  use (mw: Middleware<T>) {
    assert(isFunction(mw), 'Middleware must be composed of functions')
    this.mw.push(mw)
    return this
  }

  /**
   * 获取当存储的 state
   * @return {object}
   */
  getState () {
    return assign({}, this.state)
  }

  /**
   * 注册观察者
   * @param {Observer} observer
   * @return {Store}
   */
  subscribe (observer: Observer<T>) {
    assert(isFunction(observer), 'observer must be a function')
    this.observer = observer
    return this
  }
}