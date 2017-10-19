/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 正则匹配
 * @param {RegExp} pattern
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function Pattern (pattern, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Not Matched Error`

  function validator (value) {
    return pattern.test(value)
  }

  return decorate(validator, msg, messageKey)
}

export default Pattern
export {
  Pattern
}
