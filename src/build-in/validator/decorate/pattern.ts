/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"

/**
 * 正则匹配
 * @param {RegExp} pattern
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function Pattern(pattern: RegExp, msg?: string): ValidatorDecorate {
  msg = msg || `{{key}}: Not Matched ${pattern.toString()}`

  function validator(value: any): boolean {
    return pattern.test(value)
  }

  return wrap(validator, msg)
}

export {
  Pattern
}