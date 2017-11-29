/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   28/11/2017
 * @description 数据基础类型
 */

import { decorate, ValidatorDecorate } from "./valid"

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

/**
 * 生成验证装饰器函数
 * @param {DataTypes} type
 * @param {string} [msg]
 * @return {ValidatorDecorate}
 */
export default function DataType(type: DataTypes, msg?: string): ValidatorDecorate {
  function validator(value: any) {
    return toString.call(value) === `[object ${type}]`
  }

  return decorate(validator, msg || creator(type))
}

export {
  DataType
}
