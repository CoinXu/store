/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 字符长度区间
 */
import { decorate, ValidatorDecorate } from "./valid"

/**
 * 字符长度取值区间验证
 * @param {number} min
 * @param {number} max
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function RangeLen(min: number, max: number, msg?: string): ValidatorDecorate {
  msg = msg || `{{key}}: Must be of type String than length greater than ${min} less than ${max}`

  function validator(value: any): boolean {
    return typeof value === 'string' && value.length >= min && value.length <= max
  }

  return decorate(validator, msg)
}

export {
  RangeLen
}
