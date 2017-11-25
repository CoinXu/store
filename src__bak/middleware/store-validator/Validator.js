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
   * 验证单个key
   * @param {string} key
   * @param {*} value
   * @return {?string}
   */
  validOne (key, value) {
    const validator = this.__validator__[key]

    if (validator === void 0) {
      return null
    }

    let message = null
    let length = validator.length
    let i = 0
    let vb

    // 一个验证失败后不再继续验证
    for (; i < length; i++) {
      vb = validator[i]
      if (!vb.validator(value)) {
        message = template(vb.msg, { key })
        break
      }
    }

    return message
  }

  /**
   * 验证一个object上所有字段
   * @param {Object} values
   * @return {?Object<string, string>}
   */
  valid (values) {
    const message = {}

    let propKey
    let msg
    let has = false

    for (propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      msg = this.validOne(propKey, values[propKey])
      if (msg !== null) {
        has = true
        message[propKey] = msg
      }
    }

    return has ? message : null
  }

  /**
   * @return {?Object<string, string>}
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
   * 更新数据
   * @param {Object|string} valuesOrKey
   * @param {*} [valueOrUndef]
   * @return {?Object<string, string>}
   */
  set (valuesOrKey, valueOrUndef) {
    const values = arguments.length === 2 ? { [valuesOrKey]: valueOrUndef } : valuesOrKey
    const message = this.valid(values)

    // 保存检测状态
    this.__message__ = message === null ? {} : message

    for (let propKey  in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      if (message && hasOwnProperty.call(message, propKey)) continue
      this[propKey] = values[propKey]
    }

    return message
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
