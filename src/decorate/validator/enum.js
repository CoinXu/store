/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

import { decorate } from './valid'

/**
 * @param {Object} enumData
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Enum (enumData, msg) {
  const values = Object.keys(enumData).map(key => enumData[key])
  msg = msg || `Enum Type Error: {{key}} Must be one of ${values.join('')}`

  function validator (value) {
    return values.includes(value)
  }

  return decorate(validator, msg)
}

export default Enum
export {
  Enum
}
