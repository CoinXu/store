/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

import { ValidatorDefaultBuffer, hasOwnProperty, template } from '../../decorate/validator/valid'

/**
 * @typedef {Object<string, Array<string>>} ValidMessage
 */

class StoreModel {

  constructor () {
    this.__listener__ = null
    this.__message__ = {}
    this.__validator__ = this.validator()
  }

  /**
   * @param {Object} action
   * @param {Function} done
   * @return {StoreModel}
   */
  scheduler (action, done) {
    console.error('Store Model must implement scheduler method')
    done()
    return this
  }

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
    const validator = this.__validator__
    const message = this.__message__

    let propKey
    let valid
    let fault
    let arr

    for (propKey in values) {
      if (!hasOwnProperty.call(values, propKey) || !hasOwnProperty.call(validator, propKey)) {
        continue
      }

      valid = validator[propKey]
      arr = []
      fault = valid.some(function (vb) {
        if (vb.validator(values[propKey])) {
          return false
        }
        arr.push(template(vb.msg, { key: propKey }))
        return true
      })

      if (fault) {
        message[propKey] = arr
      } else {
        message[propKey] = null
      }
    }

    const result = {}
    let has = false

    for (propKey in message) {
      if (!hasOwnProperty.call(message, propKey) || message[propKey] === null) continue
      has = true
      result[propKey] = message[propKey]
    }

    return has ? result : null
  }

  /**
   * 更新数据
   * @param {Object|string} valuesOrKey
   * @param {*} [valueOrUndef]
   * @return {StoreModel}
   */
  set (valuesOrKey, valueOrUndef) {
    const values = arguments.length === 2 ? { [valuesOrKey]: valueOrUndef } : valuesOrKey
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
