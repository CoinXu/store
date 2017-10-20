/**
 * @Author sugo.io<asd>
 * @Date 17-10-18
 * @description 类型验证
 */

import { decorate } from './valid'

const toString = Object.prototype.toString

/**
 * @typedef {Object} ValidTypeDesc
 * @property {string} type
 * @property {string} msg
 */

/**
 * @param {string} type
 * @return {{type: string, msg: string}}
 */
function creator (type) {
  return {
    type,
    msg: `Property [{{key}}] Type Error : Not ${type}`
  }
}

/** @type {Object<string, ValidTypeDesc>} */
const DateTypes = {
  // Primitive
  PRIM_BOOL: creator('Boolean'),
  PRIM_NUM: creator('Number'),
  PRIM_STR: creator('String'),
  PRIM_NL: creator('Null'),
  PRIM_UNDEF: creator('Undefined'),
  PRIM_SYMBOL: creator('Symbol'),

  // Object
  OBJ_O: creator('Object'),
  OBJ_A: creator('Array')
}

/**
 * 生成验证装饰器函数
 * @param {ValidTypeDesc} ValidType
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function DateType (ValidType, msg) {
  function validator (value, target) {
    return toString.call(value) === `[object ${ValidType.type}]`
  }

  return decorate(validator, msg || ValidType.msg)
}

DateType.DateTypes = DateTypes

export {
  DateTypes,
  DateType
}
