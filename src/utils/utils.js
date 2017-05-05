/**
 * Created on 28/04/2017.
 */

function noop () {}

function isType (type) {
  return function (v) {
    return Object.prototype.toString.call(v) === '[object ' + type + ']'
  }
}

const isFunction = isType('Function')
const isObject = isType('Object')
const isUndefined = isType('Undefined')
const isString = isType('String')
const isArray = isType('Array')

const getPrototypeOf = Object.getPrototypeOf || function (obj) {return obj.__proto__}

function isPureObject (v) {
  if (!isObject(v)) return false
  const prop = getPrototypeOf(v)
  if (prop === null) return true
  
  const Ctor = prop.hasOwnProperty('constructor') && prop.constructor
  return isFunction(Ctor) && Ctor === Object
}

function warning (expected, message) {
  if (!expected && !isUndefined(console) && isFunction(console.error)) {
    console.error(message)
  }
}

function assert (expected, message) {
  if (!expected) {
    throw new Error(message)
  }
}

export {
  noop,
  isFunction,
  isObject,
  isString,
  isUndefined,
  isArray,
  isPureObject,
  warning,
  assert
}