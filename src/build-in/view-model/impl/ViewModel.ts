/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

import { Model } from "../../model/impl/Model"
import { ViewModel as ViewModelInter } from "../inter/ViewModel"
import { Scheduler } from "../inter/Scheduler"
import { Description } from "../inter/Description"
import { Store } from "../../../impl/Store"

/**
 *
 * `ViewModel`与`Model`的唯一区别就是多了一个`store`属性。
 * 因为`Model`为了保持其纯粹性，每个`Model`都是独立存在的，不必依赖于某一个`Store`。
 * 而`ViewModel`中包含了诸多的业务逻辑，一定是与某一个具体的`Store`相关。
 * 而且在任何时候都需要有`dispatch`的能力。
 */
export class ViewModel<T, U> extends Model<T> implements ViewModelInter<T> {
  public store: Store<U>
  public scheduler: Scheduler<T>

  /**
   *
   * @param {Description<T>} description
   * @param {Store<any>} store
   */
  public constructor(description: Description<T>, store: Store<U>) {
    super(description)
    this.store = store
  }

  /**
   * 验证传入对象是否是`ViewModel`的实例
   * @param ins
   * @returns {boolean}
   */
  public static isViewModel<T, U>(ins: any): ins is ViewModel<T, U> {
    return ins instanceof ViewModel
  }
}