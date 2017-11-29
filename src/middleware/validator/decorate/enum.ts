/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description Enum类型验证
 */

import { decorate, ValidatorDecorate } from "./valid"
import { keys, includes, map } from "../../../utils/utils"

/**
 * @param {Object} enumData
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function Enum(enumData: object, msg?: string): ValidatorDecorate {
  const values: any[] = map(keys(enumData), key => (enumData as any)[key])
  msg = msg || `Enum Type Error: {{key}} Must be one of ${values.join('')}`

  function validator(value: any): boolean {
    return includes(values, value)
  }

  return decorate(validator, msg)
}

export {
  Enum
}
