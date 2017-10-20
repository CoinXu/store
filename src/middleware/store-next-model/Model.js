/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

import { ValidatorDefaultBuffer, hasOwnProperty, template } from '../../decorate/validator/valid'

/**
 * @typedef {Object<string, Array<string>>} ValidMessage
 */

class StoreModel {

  /**
   * @param {function} listener
   * @return {StoreModel}
   */
  listen (listener) {
    // TODO 不占用this属性名
    this.__listener__ = listener
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
      valid = ValidatorDefaultBuffer.get(proto)
      if (valid !== null) {
        Object.assign(validators, valid.validator)
      }
      proto = proto.__proto__
    }

    return validators
  }

  /**
   * @param {Object} values
   * @return {?Object<string, Array<string>>}
   */
  valid (values) {
    const validator = this.validator()
    const results = {}

    let propKey
    let valid
    let fault
    let msg
    let has = fault

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
        has = true
      }
    }

    return has ? results : null
  }

  /**
   * 更新数据
   * @param {Object|string} valuesOrKey
   * @param {*} [valueOrUndef]
   * @return {StoreModel}
   */
  set (valuesOrKey, valueOrUndef) {
    const values = valueOrUndef ? { [valuesOrKey]: valueOrUndef } : valuesOrKey
    const msg = this.valid(values)

    for (let propKey  in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      if (msg && hasOwnProperty.call(msg, propKey)) continue
      this[propKey] = values[propKey]
    }

    if (this.__listener__) {
      this.__listener__(msg)
    }

    return this
  }
}

export {
  StoreModel
}