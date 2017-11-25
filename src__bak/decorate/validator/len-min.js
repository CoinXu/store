/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 字符最小长度验证
 * @param {number} length
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function MinLen (length, msg) {
  msg = msg || `{{key}}: Must be of type String that length greater than ${length}`

  function validator (value) {
    return typeof value === 'string' && value.length >= length
  }

  return decorate(validator, msg)
}

export default MinLen
export {
  MinLen
}
