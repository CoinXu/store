/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

import { StateSignature } from "../inter/StateSignature"
import { Action } from "../inter/Action"
import { DispatchCallback } from "../inter/DispatchCallback"
import { Middleware } from "../inter/Middleware"
import { StoreObserver } from "../inter/StoreObserver"

export abstract class AbstractStore<T extends StateSignature> {

  /**
   * 大多数情况下Store需要一个初始化的Action来给State赋初始值，
   * 特别是在constructor中没有传入初始state的情况下
   *
   * @param {Action} action
   * @returns {AbstractStore<T extends StateSignature>}
   */
  public abstract initialize(action?: Action): AbstractStore<T>

  /**
   * 派发一个Action，同时可以接受一个DispatchCallback参数，该Action执行完成后调用。
   * 在该函数调用时，需要将Action按顺序依次传递给所有的中间件
   *
   * @param {Action | Action[]} action
   * @param {DispatchCallback<T extends StateSignature>} callback
   * @returns {AbstractStore<T extends StateSignature>}
   */
  public abstract dispatch(action: Action | Action[], callback?: DispatchCallback<T>): AbstractStore<T>

  /**
   * Store中接入一个中间件，中间件以接入的顺序排序
   *
   * @param {Middleware<T extends StateSignature>} mw
   * @returns {AbstractStore<T extends StateSignature>}
   */
  public abstract use(mw: Middleware<T>): AbstractStore<T>

  /**
   * 返回当前T的结果
   *
   * @returns {T}
   */
  public abstract getState(): T

  /**
   * 注册一个观察者，当派发一个Action完成后，该observer会被调用，并传入当前的T
   *
   * @param {StoreObserver<T extends StateSignature>} observer
   * @returns {AbstractStore<T extends StateSignature>}
   */
  public abstract subscribe(observer: StoreObserver<T>): AbstractStore<T>
}