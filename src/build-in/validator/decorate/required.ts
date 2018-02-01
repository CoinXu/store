/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function Required(msg = '{{key}} is required'): ValidatorDecorate {
  function validator(value: any): boolean {
    return value !== void 0 && value !== ''
  }

  return wrap(validator, msg)
}

export {
  Required
}
