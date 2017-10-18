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

const Valid = {
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

function valid (validator, msg) {
  return function (target, key, descriptor) {
    const initializer = descriptor.initializer

    descriptor.initializer = function () {
      const value = initializer.call(target)
      if (!validator(value)) {
        throw new Error(msg)
      }
      return value
    }
    return descriptor
  }
}

class A {
  @valid(Valid.isNumber)
  a = 0
}

const a = new A()
console.log(a.a)