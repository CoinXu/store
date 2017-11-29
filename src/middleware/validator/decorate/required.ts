/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 必填值验证
 */
import { decorate, ValidatorDecorate } from "./valid"

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function Required(msg = '{{key}} is required'): ValidatorDecorate {
  function validator(value: any): boolean {
    return value !== void 0 && value !== ''
  }

  return decorate(validator, msg)
}

export {
  Required
}
