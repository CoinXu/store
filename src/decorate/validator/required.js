/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @param {string} [messageKey = 'message']
 * @return {ValidDecorate}
 */
function Required (msg = '{{key}} is required', messageKey = 'message') {
  function validator (value) {
    return value !== void 0 && value !== ''
  }

  return decorate(validator, msg, messageKey)
}

export default Required
export {
  Required
}
