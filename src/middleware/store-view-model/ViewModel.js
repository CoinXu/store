/**
 * Created on 10/05/2017.
 */

import Model from '../store-model/Model'

/**
 * @class
 * `ViewModel`与`Model`的唯一区别就是多了一个`store`属性。
 * 因为`Model`为了保持其纯粹性，每个`Model`都是独立存在的，不必依赖于某一个`Store`。
 * 而`ViewModel`中包含了诸多的业务逻辑，一定是与某一个具体的`Store`相关。
 * 而且在任何时候都需要有`dispatch`的能力。
 */
class ViewModel extends Model {
  /**
   * @override
   * @param {ModelDesc} desc
   * @param {Store} store
   */
  constructor (desc, store) {
    super(desc)
    this.store = store
  }

  /**
   * 验证传入对象是否是`ViewModel`的实例
   * @param ins
   * @return {boolean}
   */
  static isViewModel (ins) {
    return ins instanceof ViewModel
  }
}

export default ViewModel