/**
 * Created on 30/05/2017.
 */

import Model from '../store-model/Model'
import { isPureObject, assert, legalId, isUndefined } from '../../utils/utils'

class CollectionModel extends Model {
  /**
   * desc.state如果有id属性，则不必传入id
   * 如果两个都有，优先取id
   * @param {ModelDesc} desc
   * @param {string|number} [id]
   */
  constructor (desc, id) {
    id = isUndefined(id) ? desc.state.id : id
    assert(legalId(id), 'state must have an id property')

    super(desc)
    this.id = id
    this.desc = desc
  }

  /**
   * 创建一个新的实例
   * @param {ModelDesc} desc
   * @param {string|number} [id]
   */
  create (desc, id) {
    desc = { ...this.desc, ...(isPureObject(desc) ? desc : {}) }
    return new CollectionModel(desc, id)
  }

  /**
   * @override
   * @param ins
   * @return {boolean}
   */
  static isModel (ins) {
    return ins instanceof CollectionModel
  }
}

export default CollectionModel