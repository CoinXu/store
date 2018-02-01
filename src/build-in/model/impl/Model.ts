/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { Description } from "../inter/Description"
import { Model as ModelInter } from "../inter/Model"
import { Scheduler } from "../inter/Scheduler"
import { NextCallback } from "../../../core/inter/NextCallback"
import { Action } from "../../../core/inter/Action"
import { StateSignature } from "../../../core/inter/StateSignature"

import { assert, isString, isFunction, isPureObject } from "../../../core/impl/utils"
import { assign } from "../../../core/impl/compatible"

export class Model<T> implements ModelInter<T> {
  public name: string
  public state: T
  public scheduler: Scheduler<T>

  /**
   * @param {Description<T>} description
   */
  public constructor(description: Description<T>) {
    const { name, scheduler, state } = description

    if (process.env.NODE_ENV === "development") {
      assert(isString(name), 'name must be a string')
      assert(isFunction(scheduler), 'scheduler must be a function')
      assert(isPureObject(state), 'state must be a pure object')
    }

    this.name = name
    this.scheduler = scheduler
    this.state = assign({}, state)
  }


  /**
   * model需要一个接口来接收被观察时外部传入的参数。
   * 在接收到新的`action`时，便会有新的`next`传入。
   * 此时需要重新创建`actions`的代理。
   * 之后开始调用`scheduler`调度处理程序。
   *
   * 如果`scheduler`返回不是`undefined`，
   * 那么会认为该次接收到的action已被完成处理。
   * 将会自动调用`next`通知`store`当前中间件已执行完成
   *
   * @param {object} action
   * @param {Next} storeState
   * @param {function} next
   * @return {Model}
   */

  public receiver(action: Action, storeState: any, next: NextCallback<StateSignature>): Model<T> {
    const thiz: Model<T> = this

    function done(state: Partial<T>) {
      thiz.done(state, next)
    }

    const state: any = this.scheduler.call(this, this.state, action, done)

    if (isPureObject<T>(state)) done(state)
    return this
  }


  /**
   * 当处理完一个`action`时，该方法将会被调用。
   * 调用此方法时，将会通知观察者，并将当前的最终`state`传入观察者。
   * 请注意，该函数只接收一个纯粹的`Object`对象。
   * 其他参数一律抛出错误。
   * @param {object} state
   * @param {Next} next
   * @return {Model}
   */
  public done(state: Partial<T>, next: NextCallback<StateSignature>): Model<T> {
    if (process.env.NODE_ENV === "development") {
      assert(isPureObject(state), 'state must be a pure object');
    }

    assign(this.state, state)
    next({ [this.name]: assign({}, this.state) })

    return this
  }

  /**
   * 验证一个对象是否是Model的实例
   * @param ins
   * @return {boolean}
   */
  public static isModel<T>(ins: any): ins is Model<T> {
    return ins instanceof Model
  }
}
