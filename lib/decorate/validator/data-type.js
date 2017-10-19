'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateType = exports.DateTypes = undefined;

var _valid = require('./valid');

const toString = Object.prototype.toString;

/**
 * @typedef {Object} ValidTypeDesc
 * @property {string} type
 * @property {string} msg
 */

/**
 * @param {string} type
 * @return {{type: string, msg: string}}
 */
/**
 * @Author sugo.io<asd>
 * @Date 17-10-18
 * @description 类型验证
 */

function creator(type) {
  return {
    type,
    msg: `Property [{{key}}] Type Error : Not ${type}`
  };
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

  /**
   * 验证装饰器描述对象中的getter函数
   * @callback ValidDescriptorGetter
   * @return {*}
   */

  /**
   * 验证装饰器描述对象中的setter函数
   * @callback ValidDescriptorSetter
   * @param {*} value
   * @return {undefined}
   */

  /**
   * 验证装饰器描述对象
   * @typedef {Object} ValidDescriptor
   * @property {boolean} configurable
   * @property {boolean} enumerable
   * @property {ValidDescriptorGetter} get
   * @property {ValidDescriptorSetter} set
   */

  /**
   * babel-plugin-transform-decorators-legacy
   * 转换后的代码descriptor会有initializer函数，返回初始值
   * @typedef {Object} InitializeDescriptor
   * @property {boolean} enumerable
   * @property {Function} initializer
   */

  /**
   * 验证装饰器函数
   * @callback ValidDecorate
   * @param {Object} target
   * @param {string} key
   * @param {InitializeDescriptor} descriptor
   * @return {ValidDescriptor}
   */

  /**
   * 生成验证装饰器函数
   * @param {ValidTypeDesc} ValidType
   * @param {string} [msg]
   * @param {string} [messageKey = 'message']
   * @return {ValidDecorate}
   */
};function DateType(ValidType, msg, messageKey = 'message') {
  function validator(value, target) {
    return toString.call(value) === `[object ${ValidType.type}]`;
  }

  return (0, _valid.decorate)(validator, msg || ValidType.msg, messageKey);
}

DateType.DateTypes = DateTypes;

exports.DateTypes = DateTypes;
exports.DateType = DateType;