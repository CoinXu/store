/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import ValidatorDefaultBuffer from "./ValidatorDefaultBuffer"
import { template } from "./utils"
import { Descriptor } from "../inter/Descriptor"
import { TargetValidator } from "../inter/TargetValidator"
import { assign } from "../../../core/impl/compatible"
import { isObject } from "../../../core/impl/utils"
import { StateSignature } from "../../../core/inter/StateSignature"
import { Validator as ValidatorInter, ObjectKeysReMapPartial } from "../inter/Validator"

const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * 验证器基类,所有的验证器都必须继承该类
 */
export class Validator<T extends StateSignature> implements ValidatorInter<T> {
  private __message__: ObjectKeysReMapPartial<T, string>
  private __validator__: ObjectKeysReMapPartial<T, Descriptor[]>

  public constructor() {
    this.__message__ = {}
    this.__validator__ = {}

    let proto: any = new.target.prototype
    let valid: TargetValidator

    while (proto) {
      valid = ValidatorDefaultBuffer.get(proto)
      if (valid !== null) {
        assign(this.__validator__, valid.validator)
      }
      proto = proto.__proto__
    }
  }

  public validator(): ObjectKeysReMapPartial<T, Descriptor[]> {
    return this.__validator__
  }

  /**
   * 验证单个key
   * @param {string} key
   * @param {*} value
   * @return {?string}
   */
  public validOne(key: keyof T, value: any): string {
    const validator: Descriptor[] = this.__validator__[key]

    if (validator === void 0) {
      return null
    }

    let message: string = null
    let length: number = validator.length
    let i: number = 0
    let vd: Descriptor

    // 一个验证失败后不再继续验证
    for (; i < length; i++) {
      vd = validator[i]
      if (!vd.validator(value)) {
        message = template(vd.msg, { key })
        break
      }
    }

    return message
  }

  /**
   * 验证一个object上所有字段
   * @param {Object} values
   * @return {Object<string, string>}
   */
  public valid(values: Partial<T>): ObjectKeysReMapPartial<T, string> {
    const message: ObjectKeysReMapPartial<T, string> = {}

    for (let propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      message[propKey] = this.validOne(propKey, values[propKey])
    }

    return message
  }

  /**
   * @return {?Object<string, string>}
   */
  public getValid(): ObjectKeysReMapPartial<T, string> {
    const result: ObjectKeysReMapPartial<T, string> = {}
    const message = this.__message__

    let has: boolean

    for (const propKey in message) {
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
  public set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any): ObjectKeysReMapPartial<T, string> {
    let values: Partial<T>

    if (isObject<Partial<T>>(valuesOrKey)) {
      values = valuesOrKey
    } else {
      values = { [valuesOrKey]: valueOrUndef } as Partial<T>
    }

    const message = this.valid(values)
    // 保存检测状态
    this.__message__ = assign(this.__message__, message)

    for (let propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      if (message[propKey] !== null) continue
      (this as { [key: string]: any })[propKey] = values[propKey]
    }

    return message
  }

  /**
   * @param {*} ins
   * @return {boolean}
   */
  static isValidator<T>(ins: any): ins is Validator<T> {
    return ins instanceof Validator
  }
}
