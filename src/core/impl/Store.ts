/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { AbstractStore } from "./AbstractStore"
import { StateSignature } from "../inter/StateSignature"
import { Action } from "../inter/Action"
import { DispatchCallback } from "../inter/DispatchCallback"
import { Middleware } from "../inter/Middleware"
import { StoreObserver } from "../inter/StoreObserver"
import { NextCallback } from "../inter/NextCallback"

import { warning, assert, isPureObject, isString, isFunction, isArray, noop } from "./utils"
import { assign, some } from "./compatible"
import combiner from "./combiner"

const InitializeAction: Action = { type: '__INITIALIZE__ACTION__', payload: null }

export class Store<T extends StateSignature> extends AbstractStore<T> {

  protected mw: Middleware<T>[]
  protected state: T
  protected observer: StoreObserver<T>

  /**
   * 初始化时可不传state
   * @param {T} state
   */
  public constructor(state = {} as T) {
    super()
    this.mw = []
    this.state = assign({}, state)
    this.observer = null
  }

  /** =====================================================
   *   implement abstract methods
   *  ===================================================== */
  public initialize(action = InitializeAction): Store<T> {
    return this.one(action)
  }

  /**
   * @param {Action | Action[]} action
   * @param {DispatchCallback<T extends StateSignature>} callback
   * @returns {Store<T extends StateSignature>}
   */
  public dispatch(action: Action | Action[], callback?: DispatchCallback<T>): Store<T> {
    if (isPureObject<Action>(action)) {
      return this.one(action, callback)
    }

    if (isArray<Action>(action)) {
      return this.group(action, callback)
    }

    return this
  }

  /**
   * @param {Middleware<T extends StateSignature>} mw
   * @returns {Store<T extends StateSignature>}
   */
  public use(mw: Middleware<T>): Store<T> {
    if (process.env.NODE_ENV === "development") {
      assert(isFunction(mw), 'Middleware must be composed of functions')
    }

    this.mw.push(mw)
    return this
  }

  /**
   * @returns {T}
   */
  public getState(): T {
    return <T>assign({}, this.state)
  }

  /**
   * @param {StoreObserver<T extends StateSignature>} observer
   * @returns {Store<T extends StateSignature>}
   */
  public subscribe(observer: StoreObserver<T>): Store<T> {
    if (process.env.NODE_ENV === "development") {
      assert(isFunction<StoreObserver<T>>(observer), 'observer must be a function')
    }

    this.observer = observer
    return this
  }

  /**
   * 派发单个Action并执行回调
   *
   * @param {Action} action
   * @param {DispatchCallback<T extends StateSignature>} callback
   * @returns {Store<T extends StateSignature>}
   * @private
   */
  private _dispatch(action: Action, callback?: DispatchCallback<T>): Store<T> {
    if (process.env.NODE_ENV === "development") {
      warning(isString(action.type), 'type of action must be a string')
    }

    const thiz: Store<T> = this
    combiner<T>(this.mw)(action,
      thiz.state,
      function (result: Partial<T>) {
        assign(thiz.state, result)
      },
      function () {
        if (isFunction<DispatchCallback<T>>(callback)) {
          callback(thiz.state)
        }
      })

    return this
  }


  /**
   * 派发单个Action
   *
   * @param {Action} action
   * @param {DispatchCallback<T extends StateSignature>} callback
   * @returns {Store<T extends StateSignature>}
   */
  protected one(action: Action, callback?: DispatchCallback<T>): Store<T> {
    const thiz: Store<T> = this

    return this._dispatch(action, function (state: T) {
      if (thiz.observer !== null) {
        thiz.observer(state)
      }

      if (isFunction(callback)) {
        callback(state)
      }
    })
  }

  /**
   * 派发一组Action
   *
   * @param {Action[]} actions
   * @param {DispatchCallback<T extends StateSignature>} callback
   * @returns {Store<T extends StateSignature>}
   */
  protected group(actions: Action[], callback?: DispatchCallback<T>): Store<T> {
    if (process.env.NODE_ENV === "development") {
      some(actions, function (action) {
        assert(isPureObject(action), 'action must be a pure object')
        return false
      })
    }

    const thiz: Store<T> = this
    const mws: Middleware<T>[] = actions.map(function (action: Action): Middleware<T> {
      return function (a: null, s: null, next: NextCallback<T>): void {
        thiz._dispatch(action, <DispatchCallback<T>>function (state: T) {
          next(state)
        })
      }
    })

    combiner(mws)(null, null, noop, function () {
      if (thiz.observer !== null) {
        thiz.observer(thiz.state)
      }

      if (isFunction<DispatchCallback<T>>(callback)) {
        callback(thiz.state)
      }
    })

    return this
  }
}