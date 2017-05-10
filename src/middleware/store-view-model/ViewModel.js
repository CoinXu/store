/**
 * Created on 10/05/2017.
 */

import Model from '../store-model/Model'

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
}

export default ViewModel