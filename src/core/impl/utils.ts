/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

const ObjectProp: Object = Object.prototype

export function noop(): void {
}

/** =====================================================
 *   is type validator
 *  ===================================================== */

export function isFunction<T extends Function>(value: any): value is T {
  return ObjectProp.toString.call(value) === "[object Function]"
}

export function isObject<T>(value: any): value is T {
  return ObjectProp.toString.call(value) === "[object Object]"
}

export function isArray<T>(value: any): value is Array<T> {
  return ObjectProp.toString.call(value) === "[object Array]"
}

export function isUndefined(value: any): value is undefined {
  return ObjectProp.toString.call(value) === "[object Undefined]"
}

export function isString(value: any): value is string {
  return ObjectProp.toString.call(value) === "[object String]"
}

export function isNumber(value: any): value is number {
  return ObjectProp.toString.call(value) === "[object Number]"
}

/** =====================================================
 *   Object utils
 *  ===================================================== */
export const getPrototypeOf = Object.getPrototypeOf || function (obj: any): any {
  return obj.__proto__
}

export function isPureObject<T>(value: any): value is T {
  if (!isObject(value)) {
    return false
  }
  const prop: any = getPrototypeOf(value)
  if (prop === null) {
    return true
  }
  const Ctor = prop.hasOwnProperty('constructor') && prop.constructor
  return isFunction(Ctor) && Ctor === Object
}

/** =====================================================
 *   assert utils
 *  ===================================================== */

const warn = isObject(console) && isFunction(console.warn) ? function (message?: any) {
  console.warn(message)
} : noop

export function warning(expected: boolean, message: string): void {
  if (!expected) {
    warn(message)
  }
}

export function assert(expected: boolean, message: string): void | never {
  if (!expected) {
    throw new Error(message)
  }
}