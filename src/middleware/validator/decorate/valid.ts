/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 验证器相关工具类
 */

import { find } from "../../../utils/utils"

export const hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * @param {string} temp
 * @param {Object} values
 * @return {string}
 * @example
 * ```js
 * template('{{key}} is {{value}}', {key:'k', value: 'v'}) // k is v
 * ```
 */
export function template(temp: string, values: { [key: string]: any }): string {
  for (let propKey in values) {
    if (!hasOwnProperty.call(values, propKey)) continue
    temp = temp.replace(new RegExp(`{{\s*${propKey}\s*}}`, 'g'), values[propKey])
  }
  return temp
}

/**
 * 验证器:接收任意参数,返回boolean值
 */
export interface Validator {
  (v: any): boolean
}

/**
 * 验证器缓存结构:
 * msg为错误消息,可以template函数能够解析的类型
 * validator为验证器
 */
export interface ValidatorDesc {
  msg: string
  validator: Validator
}

/**
 * 目标验证器缓存结构:
 * target一般为class的Constructor
 * validator的key为target的属性名,value为ValidatorDesc数组
 */
export interface TargetValidator {
  target: any
  validator: { [key: string]: ValidatorDesc[] }
}

/**
 * 缓存所有target的验证器相关信息
 * 之所以缓存在该类上,是避免在target上增加额外的属性值
 * 也方便统一管理
 */
export class ValidatorBuffer {
  private buffer: TargetValidator[]

  public constructor() {
    this.buffer = []
  }

  /**
   * 添加缓存
   * @param {*} target
   * @param {string} key
   * @param {Validator} validator
   * @param {string} msg
   * @return {ValidatorBuffer}
   */
  public add(target: any, key: string, validator: Validator, msg: string): ValidatorBuffer {
    let buf: TargetValidator = find<TargetValidator>(this.buffer, buf => buf.target === target)

    if (buf) {
      const arr = buf.validator[key] || (buf.validator[key] = [])
      arr.push({ msg, validator })
      return this
    }

    this.buffer.push({
      target,
      validator: {
        [key]: [{ msg, validator }]
      }
    })

    return this
  }

  /**
   * @param {*} target
   * @return {Object<string, Array<ValidatorBuffer>>|null}
   */
  public get(target: any): TargetValidator {
    return find<TargetValidator>(this.buffer, buf => buf.target === target) || null
  }

  /**
   * @param {*} target
   * @return {ValidatorBuffer}
   */
  public destroy(target: any): ValidatorBuffer {
    this.buffer = this.buffer.filter(buf => buf.target !== target)
    return this
  }
}

export const ValidatorDefaultBuffer = new ValidatorBuffer()

export interface ValidatorDecorate {
  (target: any, key: string, descriptor?: any): any
}

/**
 * 创建验证器装饰器
 * @param validator
 * @param msg
 */
export function decorate(validator: Validator, msg: string): ValidatorDecorate {
  /**
   * 如果value为初始值,直接返回true
   * 使用null标识初始值
   * @param {*} value
   * @return {boolean}
   */
  function wrapper(value: any): boolean {
    return value === null || validator(value)
  }

  return function (target: any, key: string, descriptor: any): any {
    ValidatorDefaultBuffer.add(target, key, wrapper, msg)
    return descriptor
  }
}