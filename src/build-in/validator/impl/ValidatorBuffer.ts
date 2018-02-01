/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { TargetValidator } from "../inter/TargetValidator"
import { ValidatorFunction } from "../inter/ValidatorFunction"

import { find, filter } from "../../../core/impl/compatible"

export class ValidatorBuffer {
  private buffer: TargetValidator[]

  public constructor() {
    this.buffer = []
  }

  /**
   * 添加缓存
   * @param target
   * @param {string} key
   * @param {ValidatorFunction} validator
   * @param {string} msg
   * @returns {ValidatorBuffer}
   */
  public add(target: any, key: string, validator: ValidatorFunction, msg: string): ValidatorBuffer {
    let buf: TargetValidator = find<TargetValidator>(this.buffer, buf => buf.target === target)

    if (buf) {
      const arr = buf.validator[key] || (buf.validator[key] = [])
      arr.push({ msg, validator })
      return this
    }

    this.buffer.push({
      target,
      validator: {
        [key]: [{ msg, validator }]
      }
    })

    return this
  }

  /**
   *
   * @param target
   * @returns {TargetValidator}
   */
  public get(target: any): TargetValidator {
    return find<TargetValidator>(this.buffer, buf => buf.target === target) || null
  }

  /**
   * @param {*} target
   * @return {ValidatorBuffer}
   */
  public destroy(target: any): ValidatorBuffer {
    this.buffer = filter<TargetValidator>(this.buffer, buf => buf.target !== target)
    return this
  }
}
