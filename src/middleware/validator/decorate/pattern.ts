/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 正则模式匹配
 */
import { decorate, ValidatorDecorate } from "./valid"

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

  return decorate(validator, msg)
}

export {
  Pattern
}
