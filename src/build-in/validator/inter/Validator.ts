/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { StateSignature } from "../../../core/inter/StateSignature"
import { Descriptor } from "./Descriptor"

export type ObjectKeysReMapPartial<T, U> = {[K in keyof T]?:U}

export interface Validator<T extends StateSignature> {
  /**
   * 返回所有的Description
   * @returns {object}
   */
  validator(): ObjectKeysReMapPartial<T, Descriptor[]>

  /**
   * 验证单个key-value
   * @param {string} key
   * @param value
   * @returns {string}
   */
  validOne(key: keyof T, value: any): string

  /**
   * 验证一组key-value
   * @param {object} values
   * @returns {object}
   */
  valid(values: Partial<T>): ObjectKeysReMapPartial<T, string>

  /**
   * 获取当前验证状态
   * @returns {object}
   */
  getValid(): ObjectKeysReMapPartial<T, string>

  /**
   * 向Validator中写入数据，该过程会先验证，验证失败的项会直接抛弃
   * @param {object|string} valuesOrKey
   * @param {*} [valueOrUndef]
   * @returns {object}
   */
  set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any): ObjectKeysReMapPartial<T, string>
}