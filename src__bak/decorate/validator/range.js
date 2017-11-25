/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * 数值取值验证
 * @param {number} min
 * @param {number} max
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Range (min, max, msg) {
  msg = msg || `{{key}}: Must be of type number that greater than ${min} less than ${max} `

  function validator (value) {
    return typeof value === 'number' && value >= min && value <= max
  }

  return decorate(validator, msg)
}

export default Range
export {
  Range
}
