/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"

/**
 * 数值取值验证
 * @param {number} min
 * @param {number} max
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function Range(min: number, max: number, msg?: string): ValidatorDecorate {
  msg = msg || `{{key}}: Must be of type number that greater than ${min} less than ${max} `

  function validator(value: any): boolean {
    return typeof value === 'number' && value >= min && value <= max
  }

  return wrap(validator, msg)
}

export {
  Range
}
