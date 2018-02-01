/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"
import { keys, includes, map } from "../../../core/impl/compatible"


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

  return wrap(validator, msg)
}

export {
  Enum
}