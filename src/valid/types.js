/**
 * @Author sugo.io<asd>
 * @Date 17-10-18
 */

const toString = Object.prototype.toString

/**
 * @callback TypeValid
 * @param {*} value
 * @return {boolean}
 */

/**
 * @param {string} type
 * @return {TypeValid}
 */
function creator (type) {
  return function (val) {
    return toString.call(val) === `[object ${type}]`
  }
}

export default {
  // primitive type
  isBoolean: creator('Boolean'),
  isNull: creator('Null'),
  isUndefined: creator('Undefined'),
  isNumber: creator('Number'),
  isString: creator('String'),
  isSymbol: creator('Symbol'),

  // object
  isObject: creator('Object'),
  isArray: creator('Array')
}

function add (target, key, descriptor) {
  console.log(target)
  console.log(key)
  console.log(descriptor)
}

class A {
  @add
  a = 0
}

const a = new A()
console.log(a.a)