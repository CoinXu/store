/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 数值左右边界验证
 */
import { decorate, ValidatorDecorate } from "./valid"

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

  return decorate(validator, msg)
}

export {
  Range
}
