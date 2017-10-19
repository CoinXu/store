/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 右边界验证
 * @param {number} num
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function Max (num, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Must be of type umber and less than ${num}`

  function validator (value) {
    return typeof value === 'number' && value <= num
  }

  return decorate(validator, msg, messageKey)
}

export default Max
export {
  Max
}
