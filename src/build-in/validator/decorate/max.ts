/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"

/**
 * 右边界验证
 * @param {number} num
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function Max(num: number, msg?: string): ValidatorDecorate {
  msg = msg || `{{key}}: Must be of type number and less than ${num}`

  function validator(value: any): boolean {
    return typeof value === 'number' && value <= num
  }

  return wrap(validator, msg)
}

export {
  Max
}
