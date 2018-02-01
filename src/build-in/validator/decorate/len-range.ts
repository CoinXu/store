/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"

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

  return wrap(validator, msg)
}

export {
  RangeLen
}
