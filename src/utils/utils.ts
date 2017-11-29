import { fail } from "assert";

/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   25/11/2017
 * @description
 */

const ObjectPrototype: Object = Object.prototype

export function noop(): void { }

export function isType<T>(type: string): (v: any) => v is T {
  return function (v: any): v is T {
    return ObjectPrototype.toString.call(v) === `[object ${type}]`
  }
}

export function isFunction<T extends Function>(value: any): value is T {
  return ObjectPrototype.toString.call(value) === "[object Function]"
}

export function isObject<T extends Object>(value: any): value is T {
  return ObjectPrototype.toString.call(value) === "[object Object]"
}

export function isArray<T>(value: any): value is Array<T> {
  return ObjectPrototype.toString.call(value) === "[object Array]"
}

export function isUndefined(value: any): value is undefined {
  return ObjectPrototype.toString.call(value) === "[object Undefined]"
}

export function isString(value: any): value is string {
  return ObjectPrototype.toString.call(value) === "[object String]"
}

export function isNumber(value: any): value is number {
  return ObjectPrototype.toString.call(value) === "[object Number]"
}

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

export function warning(expected: boolean, message: string): void {
  if (!expected && !isUndefined(console) && isFunction(console.error)) {
    console.error(message)
  }
}

export function assert(expected: boolean, message: string): void | never {
  if (!expected) {
    throw new Error(message)
  }
}

export function freeze<T extends Object>(obj: T): T {
  try {
    Object.freeze(obj)
  } catch (e) {
    warning(true, e.message)
  }
  return obj
}

export function assign(object: any, ...otherArgs: any[]): any {
  if (!isObject(object)) {
    return object
  }

  const length: number = otherArgs.length
  let i: number
  let propKey: string
  let tmp: any

  for (i = 0; i < length; i++) {
    tmp = otherArgs[i]
    for (propKey in tmp) {
      if (tmp.hasOwnProperty(propKey)) {
        (object as any)[propKey] = tmp[propKey]
      }
    }
  }

  return object
}

/* Array */
export function find<T>(arr: T[], filter: (v: T, index: number, arr: T[]) => boolean): T | undefined {
  const length = arr.length
  if (length === 0) {
    return undefined
  }

  let result: T | undefined = undefined
  for (let i = 0; i < length; i++) {
    if (filter(arr[i], i, arr)) {
      result = arr[i]
      break
    }
  }

  return result
}

export function every<T>(arr: T[], filter: (v: T, index: number, arr: T[]) => boolean): boolean {
  const length = arr.length
  if (length === 0) {
    return true
  }

  for (let i = 0; i < length; i++) {
    if (filter(arr[i], i, arr)) {
      return true
    }
  }

  return false
}

export function includes(arr: any[], value: any): boolean {
  for (let v of arr) {
    if (v === value) {
      return true
    }
  }
  return false
}

export function map(arr: any[], iterator: (v: any, i?: number, a?: any[]) => any): any[] {
  const result: any[] = []
  for (let i = 0, len: number = arr.length; i < len; i++) {
    result.push(iterator(arr[i], i, arr))
  }
  return result
}

/* Object */
export function keys(obj: { [key: string]: any }): string[] {
  if (!isObject(obj)) {
    return []
  }

  const results: string[] = []
  for (let propKey in obj) {
    if (obj.hasOwnProperty(propKey)) {
      results.push(propKey)
    }
  }
  return results
}