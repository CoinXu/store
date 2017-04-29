/**
 * Created on 28/04/2017.
 * @file 定义一个model
 * 该model定义连初版都算不上，待讨论修正，不要用于正式环境。
 */

import Observable from '../Observable'
import { isUndefined, isPureObject, isString, isFunction, assert } from '../utils/utils'

/**
 * @callback action
 * @param {Object} state
 * @param {function} done
 * @return {*}
 */

/**
 * @callback reducer
 * @param {Object} state
 * @param {Object} action
 * @param {*}
 */

/**
 * @typedef {Object} ModelDesc
 * @property {String} name
 * @property {Object} state
 * @property {Object<String, action>} actions
 * @property {reducer} reducer
 */

/**
 * @class
 * Model实现需要满足如下几个条件
 * 1. state 尽可能不要嵌套
 * 2. state 尽可能纯粹，只是处理接口数据，不必处理成view渲染所需的数据，那是viewModel应该做的事
 * 3. 接口与model分离，请求接口应该放在一个resource中定义，在model中直接调用获得结果即可。
 * 4. 每一个action只做一件事
 * 5. reducer尽可能纯粹
 * 6. 可观察
 * 7. 何时通知观察者可控
 */

class Model extends Observable {
  /**
   * @param {Object} desc
   * 创建实例时，会将desc中的actions中代理到`this.actions`中。
   * @constructor
   */
  constructor (desc) {
    super()
    const { name, scheduler, state, actions } = desc
    
    assert(isString(name), 'name must be a string')
    assert(isFunction(scheduler), 'scheduler must be a function')
    assert(isPureObject(state), 'state must be a pure object')
    
    this.actions = {}
    this.name = name
    this.scheduler = scheduler
    this.state = state
    this.desc = desc
    
    this.done = this.done.bind(this)
    this.receiver = this.receiver.bind(this)
    this.proxy(actions)
  }
  
  /**
   * 代理actions。
   * 所定义的每个action都会被代理到`this.actions`上。
   * 并在调用的时候传入两个参数：state, done
   * @param origin
   * @return {Model}
   */
  proxy (origin) {
    const { actions } = this
    for (let key in origin) {
      if (!origin.hasOwnProperty(key)) continue
      actions[key] = this.createProxy(key)
    }
    return this
  }
  
  /**
   * 创建代理
   * @param key
   * @return {function(this:Model)}
   */
  createProxy (key) {
    return function () {
      const origin = Array.prototype.slice.call(arguments)
      const args = origin.concat(this.state, this.done)
      return this.desc.actions[key].apply(this, args)
    }.bind(this)
  }
  
  /**
   * model是一个观察者，也可以被观察，所以需要一个接口来接收被观察时外部传入的参数。
   * 在此处只接收外部传入的`action`即可。
   * 得到`action`便开始调用`scheduler`调度处理程序。
   * 如果`scheduler`返回不是`undefined`，那么会认为该次接收到的action已被完成处理。
   * 将会自动调用`this.done`通知观察者。
   *
   * 再有，`scheduler` 运行在当前实例的作用域下。
   * 所以你完全可以通过`this`在`scheduler`中查看或使用当前实例中所有的属性。
   *
   * @example
   * this.actions.add()
   *
   * @param {object} action
   * @return {Model}
   */
  receiver (action) {
    const next = this.scheduler.call(this, this.state, action)
    if (!isUndefined(next)) {
      this.done(next)
    }
    return this
  }
  
  /**
   * 当处理完一个`action`时，该方法将会被调用。
   * 调用此方法时，将会通知观察者，并将当前的最终`state`传入观察者。
   * 请注意，该函数只接收一个纯粹的`Object`对象。
   * 其他参数一律抛出错误。
   * @param {Object} state
   * @return {Model}
   */
  done (state) {
    assert(isPureObject(state), 'state must be a pure object')
    
    this.state = Object.assign({}, this.state, state)
    this.onNext({ [this.name]: this.state })
    
    return this
  }
  
  /**
   * 验证一个对象是否是Model的实例
   * @param ins
   * @return {boolean}
   */
  static isModel (ins) {
    return ins instanceof Model
  }
}

export default Model
