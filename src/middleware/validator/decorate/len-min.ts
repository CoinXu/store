/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 字符最小长度
 */

import { decorate, ValidatorDecorate } from "./valid"

/**
 * 字符最小长度验证
 * @param {number} length
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function MinLen(length: number, msg?: string): ValidatorDecorate {
  msg = msg || `{{key}}: Must be of type String that length greater than ${length}`

  function validator(value: any): boolean {
    return typeof value === 'string' && value.length >= length
  }

  return decorate(validator, msg)
}

export {
  MinLen
}
