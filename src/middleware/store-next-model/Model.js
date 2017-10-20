/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

import { DefaultWrapper, hasOwnProperty } from '../../decorate/validator/valid'

class StoreModel {

  /**
   * @param {function} listener
   * @return {StoreModel}
   */
  listen (listener) {
    this.listener = listener
    return this
  }

  /**
   * @param {Object} values
   * @return {StoreModel}
   */
  map (values) {
    const msg = DefaultWrapper.valid(this.__proto__, values)

    let propKey

    for (propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      if (!hasOwnProperty.call(msg, propKey)) continue
      this[propKey] = values[propKey]
    }

    if (this.listener) {
      this.listener(msg)
    }

    return this
  }
}

export {
  StoreModel
}