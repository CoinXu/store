/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */
import { isObject, warning } from "./utils"

/**
 * @param {T} obj
 * @returns {T}
 */
export function freeze<T extends Object>(obj: T): T {
  try {
    Object.freeze(obj)
  } catch (e) {
    warning(true, e.message)
  }
  return obj
}

/**
 * @param {object} object
 * @param otherArgs
 * @returns {object}
 */
export function assign(object: { [key: string]: any }, ...otherArgs: any[]): any {
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
/**
 * @param {T[]} arr
 * @param {(v: T, index: number, arr: T[]) => boolean} filter
 * @returns {T | undefined}
 */
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

/**
 * @param {T[]} arr
 * @param {(v: T, index: number, arr: T[]) => boolean} filter
 * @returns {T[]}
 */
export function filter<T>(arr: T[], filter: (v: T, index: number, arr: T[]) => boolean): T[] {
  const result: T[] = []
  const length = arr.length

  if (length === 0) {
    return result
  }

  for (let i = 0; i < length; i++) {
    if (filter(arr[i], i, arr)) {
      result.push(arr[i])
    }
  }

  return result
}

/**
 * @param {T[]} arr
 * @param {(v: T, index: number, arr: T[]) => boolean} filter
 * @returns {boolean}
 */
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

/**
 * @param {T[]} arr
 * @param {(v: T, i?: number, a?: T[]) => T} iterator
 * @returns {boolean}
 */
export function some<T>(arr: T[], iterator: (v: T, i?: number, a?: T[]) => boolean): boolean {
  let result = false
  for (let i = 0, len = arr.length; i < len; i++) {
    if (iterator(arr[i], i, arr)) {
      result = true
      break
    }
  }
  return result
}

/**
 * @param {any[]} arr
 * @param value
 * @returns {boolean}
 */
export function includes(arr: any[], value: any): boolean {
  for (let v of arr) {
    if (v === value) {
      return true
    }
  }
  return false
}

/**
 * @param {T[]} arr
 * @param {(v: T, i?: number, a?: T[]) => U} iterator
 * @returns {U[]}
 */
export function map<T, U>(arr: T[], iterator: (v: T, i?: number, a?: T[]) => U): U[] {
  const result: U[] = []
  for (let i = 0, len: number = arr.length; i < len; i++) {
    result.push(iterator(arr[i], i, arr))
  }
  return result
}

/* Object */
/**
 * @param {object} obj
 * @returns {string[]}
 */
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