/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { ValidatorFunction } from "../inter/ValidatorFunction"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"
import ValidatorDefaultBuffer from "./ValidatorDefaultBuffer"

export function wrap(validator: ValidatorFunction, msg: string): ValidatorDecorate {
  /**
   * 如果value为初始值,直接返回true
   * 使用null标识初始值
   * @param {*} value
   * @return {boolean}
   */
  function wrapper(value: any): boolean {
    return value === null || validator(value)
  }

  return <ValidatorDecorate>function (target: any, key: string, descriptor: any): any {
    ValidatorDefaultBuffer.add(target, key, wrapper, msg)
    return descriptor
  }
}

const hasOwnProperty = Object.prototype.hasOwnProperty

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