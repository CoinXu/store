/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Required (msg = '{{key}} is required') {
  function validator (value) {
    return value !== void 0 && value !== ''
  }

  return decorate(validator, msg)
}

export default Required
export {
  Required
}
