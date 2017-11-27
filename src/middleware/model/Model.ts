/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

import { isPureObject, isString, isFunction, assert, assign } from '../../utils/utils'
import { Action, Next } from '../../interfaces'

export interface ModelScheduler<T> {
  (this: Model<T>, state: T, action: Action, done: (state: Partial<T>) => void): any
}

export interface ModelDescription<T> {
  name: string
  state: T
  scheduler: ModelScheduler<T>
}

/**
 * 一个`scheduler`被调用时，会传入如下几个参数
 * + state 当前`model`的状态
 * + action 触发当前调用的`action`
 * + done 完成此次`action`时通知`model`
 * @callback scheduler
 * @param {Object} state
 * @param {Object} action
 * @param {function} done
 */

/**
 * `model`描述组成
 * @typedef {Object} ModelDesc
 * @property {String} name - `model`名称，必须且在一个`Store`中唯一
 * @property {Object} state - `model`初始状态
 * @property {scheduler} scheduler - 调度器
 */

/**
 * @class
 * Model实现需要满足如下几个条件
 * 1. state 尽可能不要嵌套
 * 2. state 尽可能纯粹，只是处理接口数据，不必处理成view渲染所需的数据，那是viewModel应该做的事
 * 3. 接口与model分离，请求接口应该放在一个resource中定义，在model中直接调用获得结果即可。
 * 4. 每一个action只做一件事
 * 5. scheduler尽可能纯粹
 * 6. 可观察
 * 7. 何时通知观察者可控
 */

export default class Model<T> {

  protected name: string
  protected scheduler: ModelScheduler<T>
  protected state: T

  /**
   * @param {ModelDescription} desc
   * @constructor
   */
  public constructor(desc: ModelDescription<T>) {
    const { name, scheduler, state } = desc

    assert(isString(name), 'name must be a string')
    assert(isFunction(scheduler), 'scheduler must be a function')
    assert(isPureObject(state), 'state must be a pure object')

    this.name = name
    this.scheduler = scheduler
    // fix: [ts] Spread types may only be created from object types.
    this.state = { ...state as any }
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

  public receiver(action: Action, storeState: any, next: Next<any>): Model<T> {
    const done = (state: Partial<T>) => this.done(state, next)
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
  public done(state: Partial<T>, next: Next<any>): Model<T> {
    assert(isPureObject(state), 'state must be a pure object');

    assign(this.state, state)
    next({ [this.name]: { ...this.state as any } })

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

