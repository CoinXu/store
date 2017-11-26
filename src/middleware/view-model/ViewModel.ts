/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

import Model, { ModelDescription, ModelScheduler } from "../model/Model"
import Store from "../../Store"
import { Action } from "../../interfaces"

export interface ViewModelScheduler<T> {
  (this: ViewModel<T>, state: T, action: Action, done: (state: Partial<T>) => void): any
}

export interface ViewModelDescription<T> {
  name: string
  state: T
  scheduler: ViewModelScheduler<T>
}

/**
 * @class
 * `ViewModel`与`Model`的唯一区别就是多了一个`store`属性。
 * 因为`Model`为了保持其纯粹性，每个`Model`都是独立存在的，不必依赖于某一个`Store`。
 * 而`ViewModel`中包含了诸多的业务逻辑，一定是与某一个具体的`Store`相关。
 * 而且在任何时候都需要有`dispatch`的能力。
 */

export default class ViewModel<T> extends Model<T> {
  public store: Store<any>
  protected scheduler: ViewModelScheduler<T>

  /**
   * @param {ViewModelDescription} desc 
   * @param {Store} store 
   */
  constructor(desc: ViewModelDescription<T>, store: Store<any>) {
    super(desc)
    this.store = store
  }

  /**
   * 验证传入对象是否是`ViewModel`的实例
   * @param ins
   * @return {boolean}
   */
  static isViewModel<T>(ins: any): ins is ViewModel<T> {
    return ins instanceof ViewModel
  }
}