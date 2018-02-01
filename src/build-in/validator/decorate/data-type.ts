/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { wrap, template } from "../impl/utils"
import { ValidatorDecorate } from "../inter/ValidatorDecorate"

/**
 * @param {string} type
 * @returns {string}
 */
function creator(type: string): string {
  return `Property [{{key}}] Type Error : Not ${type}`
}

export enum DataTypes {
  // Primitive
  PRIM_BOOL = 'Boolean',
  PRIM_NUM = 'Number',
  PRIM_STR = 'String',
  PRIM_NL = 'Null',
  PRIM_UNDEF = 'Undefined',
  PRIM_SYMBOL = 'Symbol',

  // Object
  OBJ_O = 'Object',
  OBJ_A = 'Array'
}

const ObjectToString = Object.prototype.toString

/**
 * 生成验证装饰器函数
 *
 * @param {DataTypes} type
 * @param {string} msg
 * @returns {ValidatorDecorate}
 */
export default function DataType(type: DataTypes, msg?: string): ValidatorDecorate {
  function validator(value: any): boolean {
    return ObjectToString.call(value) === `[object ${type}]`
  }

  return wrap(validator, msg || creator(msg))
}

export {
  DataType
}