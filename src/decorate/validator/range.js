/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 数值取值验证
 * @param {Array<number>} range
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Range (range, msg) {
  msg = msg || `{{key}}: Must be of type number that greater than ${range[0]} less than ${range[1]} `

  function validator (value) {
    return typeof value === 'number' && value >= range[0] && value <= range[1]
  }

  return decorate(validator, msg)
}

export default Range
export {
  Range
}
