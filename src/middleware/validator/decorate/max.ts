/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 数值右边界验证
 */
import { decorate, ValidatorDecorate } from "./valid"

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

  return decorate(validator, msg)
}

export {
  Max
}