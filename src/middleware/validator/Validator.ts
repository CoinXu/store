/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 数据验证
 */

import { ValidatorDefaultBuffer, hasOwnProperty, template, ValidatorDesc, TargetValidator } from "./decorate/valid"
import { assign } from "../../utils/utils"

/**
 * 验证器基类,所有的验证器都必须继承该类
 */
export class Validator<T extends { [key: string]: any }> {
  private __message__: {[key in keyof T]?: string }
  private __validator__: {[key in keyof T]?: ValidatorDesc[]}

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

  public validator(): {[key in keyof T]?: ValidatorDesc[]} {
    return this.__validator__
  }

  /**
   * 验证单个key
   * @param {string} key
   * @param {*} value
   * @return {?string}
   */
  public validOne(key: keyof T, value: any): string | null {
    const validator: ValidatorDesc[] = this.__validator__[key]

    if (validator === void 0) {
      return null
    }

    let message: string = null
    let length: number = validator.length
    let i: number = 0
    let vd: ValidatorDesc

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
  public valid(values: Partial<T>): { [key: string]: string } {
    const message: { [key: string]: string } = {}

    for (let propKey in values) {
      if (!hasOwnProperty.call(values, propKey)) continue
      message[propKey] = this.validOne(propKey, values[propKey])
    }

    return message
  }

  /**
   * @return {?Object<string, string>}
   */
  public getValid(): {[key in keyof T]?: string} | null {
    const result: {[key in keyof T]?: string} = {}
    const message = this.__message__

    let has: boolean
    let propKey: string

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
  public set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any) {
    const values: Partial<T> = arguments.length === 2
      ? (({ [valuesOrKey as keyof T]: valueOrUndef as any } as Partial<T>))
      : valuesOrKey as Partial<T>
    const message = this.valid(values)

    // 保存检测状态
    if (message !== null) {
      this.__message__ = {
        ...(this.__message__ as any),
        ...message
      }
    }

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
