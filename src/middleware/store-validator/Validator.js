/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

import { ValidatorDefaultBuffer, hasOwnProperty, template } from '../../decorate/validator/valid'

/**
 * @typedef {Object<string, Array<string>>} ValidMessage
 */

class Validator {

  constructor () {
    this.__message__ = {}
    this.__validator__ = this.validator()
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
   * @return {?Object<string, Array<string>>}
   */
  getValid () {
    const result = {}
    const message = this.__message__

    let has
    let propKey

    for (propKey in message) {
      if (!hasOwnProperty.call(message, propKey) || message[propKey] === null) continue
      has = true
      result[propKey] = message[propKey]
    }

    return has ? result : null
  }

  /**
   * 验证单个key
   * @param {string} key
   * @param {*} value
   * @return {Array<string>}
   */
  validOne (key, value) {
    const valid = this.__validator__[key]
    const message = []

    if (valid === void 0) {
      return message
    }

    // 一个验证失败后不再继续验证
    valid.some(function (vb) {
      if (vb.validator(value)) {
        return false
      }
      message.push(template(vb.msg, { key }))
      return true
    })

    return message
  }

  /**
   * @param {Object} values
   * @return {?Object<string, Array<string>>}
   */
  valid (values) {
    const message = this.__message__

    let propKey
    let msg

    for (propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      msg = this.validOne(propKey, values[propKey])
      message[propKey] = msg.length ? msg : null
    }

    return this.getValid()
  }

  /**
   * 更新数据
   * @param {Object|string} valuesOrKey
   * @param {*} [valueOrUndef]
   * @return {Validator}
   */
  set (valuesOrKey, valueOrUndef) {
    const values = arguments.length === 2 ? { [valuesOrKey]: valueOrUndef } : valuesOrKey
    const validate = this.valid(values)

    for (let propKey  in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      if (validate && hasOwnProperty.call(validate, propKey)) continue
      this[propKey] = values[propKey]
    }

    return this
  }

  /**
   * @param {*} ins
   * @return {boolean}
   */
  static isValidator (ins) {
    return ins instanceof Validator
  }
}

export {
  Validator
}
