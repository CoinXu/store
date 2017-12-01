/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   27/11/2017
 * @description
 */
import { assert, isFunction, isNumber, isString, isArray, isObject, keys, every, find } from "../../utils/utils"

export interface CollectionJson<T> {
  models: T[]
  toDelete: T[]
  toUpdate: T[]
  toCreate: T[]
}

let counter = 0
function generate(): string {
  return "STORE_COLLECTION_PRIMARY_KEY_" + counter++
}

export default class Collection<T extends { [key: string]: any }> {
  // 主键字段
  private primaryKey: string
  // 所有model
  private models: T[]
  // 需要删除的记录
  private toDel: Partial<T>
  // 需要更新的记录
  private toUpdate: Partial<T>
  private toCreate: Partial<T>
  // 初始时保存的model，与_models作对比，确定应该添加、删除或更新
  private cache: Partial<T>

  public constructor(primaryKey: keyof T, mods: T[] = []) {
    assert(!isString(primaryKey) || !!primaryKey, 'Primary key must be a string and required')
    this.primaryKey = primaryKey
    this.reset(mods)
  }

  /**
   * 重置Collection
   * @param {Array<T>} mods
   * @return {Collection<T>}
   */
  public reset(mods: T[]): Collection<T> {
    assert(isArray(mods), 'Models must be a Array')
    const map: Partial<T> = {}
    const primaryKey: string = this.primaryKey

    mods.forEach(mod => {
      assert(isObject(mod), 'Each model muse be a object')
      map[mod[primaryKey]] = mod
    })

    this.cache = map
    // TODO use link data structure
    this.models = mods
    this.toDel = {}
    this.toUpdate = {}
    this.toCreate = {}
    return this
  }


  /**
   * 移除model，可传primaryKey和model本身
   * @param {string|Object} keyOrMod
   * @return {Collection}
   */
  public remove(keyOrMod: string | T): Collection<T> {
    const notPrimaryKey: boolean = isObject<T>(keyOrMod)
    const primaryKey: string = isObject<T>(keyOrMod) ? keyOrMod[this.primaryKey] : keyOrMod
    const PrimaryKey: string = this.primaryKey

    this.models = this.models.filter(m => notPrimaryKey ? m !== keyOrMod : m[PrimaryKey] !== keyOrMod)
    this.toDel[primaryKey] = true
    this.toCreate[primaryKey] = false
    this.toUpdate[primaryKey] = false
    return this
  }

  /**
   * 更新model
   * @param {string|number} primaryValue
   * @param {Partial<T>} props
   * @return {Collection<T>}
   */
  public update(primaryValue: string, props: Partial<T>): Collection<T> {
    assert(isString(primaryValue) || isNumber(primaryValue), 'Primary value must be String or Number instance')
    assert(isObject(props), 'Props must be a Object')

    this.models = this.models.map(m => m[this.primaryKey] === primaryValue ? { ...m as object, ...props as object } as T : m)

    // 如果在创建列表，则不需要写入更新列表
    if (!this.toCreate[primaryValue]) {
      this.toUpdate[primaryValue] = true
    }
    return this
  }
  /**
   * 添加model
   * @param {T} mod
   * @return {Collection<T>}
   */
  public add(mod: T): Collection<T> {
    assert(isObject(mod), 'Model must be a Object')

    if (mod[this.primaryKey] === void 0) {
      mod[this.primaryKey] = generate()
    }

    this.models = this.models.concat(mod)
    this.toCreate[mod[this.primaryKey]] = true
    return this
  }

  /**
   * 排序
   * @param {Function} compare
   * @return {Collection<T>}
   */
  public sort(compare: (a: T, b: T) => number): Collection<T> {
    assert(isFunction(compare), 'Compare must be a Function instance')
    this.models = this.models.sort(compare)
    return this
  }

  /**
   * 获取index位置的model
   * @param {number} index
   * @return {T|null}
   */
  public at(index: number): T | null {
    return this.models[index] || null
  }

  /**
   * 获取最后一个model
   * @return {T}
   */
  public last(): T {
    return this.models[this.models.length - 1]
  }

  /**
   * 查找model
   * @param {Partial<T>} filter
   * @return {T|null}
   */
  public find(filter: Partial<T>): T | null {
    assert(isObject(filter), 'Filter must be a Object')

    const FilterKeys = keys(filter)

    // 如果没有传入比较属性，直接返回null
    if (FilterKeys.length === 0) {
      return null
    }

    return find(this.models, mod => every(FilterKeys, k => filter[k] === mod[k])) || null
  }

  /**
   * 返回所有model
   * @return {T[]}
   */
  public get(): T[] {
    return this.models.slice()
  }

  /**
   * 将所有的model分为三类:toDelete\toUpdate\toCreate并返回
   * @return {{models: Array.<Object>, toDelete: Array, toUpdate: Array, toCreate: Array}}
   */
  public toJSON(): CollectionJson<T> {
    const toDelete: T[] = []
    const toUpdate: T[] = []
    const toCreate: T[] = []

    const md: Partial<T> = this.toDel
    const mu: Partial<T> = this.toUpdate
    const mc: Partial<T> = this.toCreate

    const primaryKey = this.primaryKey
    const cache: Partial<T> = this.cache

    let key: string = null

    this.models.forEach(m => {
      key = m[primaryKey]

      if (mu[key]) {
        toUpdate.push(m)
      }

      if (mc[key]) {
        toCreate.push(m)
      }
    })

    for (let key in md) {
      if (md[key] && cache[key]) {
        toDelete.push(cache[key])
      }
    }

    return {
      models: this.models.slice(),
      toDelete,
      toUpdate,
      toCreate
    }
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return '[object StoreCollection]'
  }
}