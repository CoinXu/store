/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

import { DefaultWrapper, hasOwnProperty, template } from '../../decorate/validator/valid'

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
   * @return {Object<string, Array<ValidatorBuffer>>}
   */
  validator () {
    const validators = {}

    let proto = this.__proto__
    let valid

    while (proto) {
      valid = DefaultWrapper.get(proto)
      if (valid !== null) {
        Object.assign(validators, valid.validator)
      }
      proto = proto.__proto__
    }

    return validators
  }

  /**
   * @param {Object} values
   * @return {Object<string, Array<string>>}
   */
  valid (values) {
    const validator = this.validator()
    const results = []

    let propKey
    let valid
    let fault
    let msg

    for (propKey in validator) {
      if (!hasOwnProperty.call(validator, propKey) || !hasOwnProperty.call(values, propKey)) {
        continue
      }

      valid = validator[propKey]
      msg = []
      fault = valid.some(function (vb) {
        if (vb.validator(values[propKey])) {
          return false
        }
        msg.push(template(vb.msg, { key: propKey }))
        return true
      })

      if (fault) {
        results[propKey] = msg
      }
    }

    return results
  }

  /**
   * @param {Object} values
   * @return {StoreModel}
   */
  map (values) {
    const msg = this.valid(values)

    let propKey

    for (propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      if (hasOwnProperty.call(msg, propKey)) continue
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