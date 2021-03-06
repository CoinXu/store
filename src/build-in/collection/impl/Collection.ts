/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

import {
  assert,
  isFunction,
  isNumber,
  isString,
  isArray,
  isObject
} from "../../../core/impl/utils";
import { keys, every, find } from "../../../core/impl/compatible";
import { CollectionJSON } from "../inter/CollectionJSON";
import { Collection as CollectionInter } from "../inter/Collection";
import { StateSignature } from "../../../core/inter/StateSignature";

let counter = 0;

function generate(): string {
  return "STORE_COLLECTION_PRIMARY_KEY_" + counter++;
}

export class Collection<T extends StateSignature>
  implements CollectionInter<T> {
  // 主键字段
  private primaryKey: keyof T;
  // 所有model
  private models: T[];
  // 需要删除的记录
  private toDel: { [key: string]: boolean };
  // 需要更新的记录
  private toUpdate: { [key: string]: boolean };
  private toCreate: { [key: string]: boolean };
  // 初始时保存的model，与_models作对比，确定应该添加、删除或更新
  private cache: { [key: string]: T };

  public constructor(primaryKey: keyof T, mods: T[] = []) {
    if (process.env.NODE_ENV === "development") {
      assert(
        !isString(primaryKey) || !!primaryKey,
        "Primary key must be a string and required"
      );
    }
    this.primaryKey = primaryKey;
    this.reset(mods);
  }

  /**
   * 重置Collection
   * @param {Array<T>} mods
   * @return {Collection<T>}
   */
  public reset(mods: T[]): Collection<T> {
    if (process.env.NODE_ENV === "development") {
      assert(isArray(mods), "Models must be a Array");
    }

    const map: { [key: string]: T } = {};
    const primaryKey: keyof T = this.primaryKey;

    mods.forEach(mod => {
      if (process.env.NODE_ENV === "development") {
        assert(isObject(mod), "Each model muse be a object");
      }
      map[mod[primaryKey]] = mod;
    });

    this.cache = map;
    // TODO use link data structure
    this.models = mods;
    this.toDel = {};
    this.toUpdate = {};
    this.toCreate = {};
    return this;
  }

  /**
   * 移除model，可传primaryKey和model本身
   * @param {string|Object} keyOrMod
   * @return {Collection}
   */
  public remove(keyOrMod: string | T): Collection<T> {
    const notPrimaryKey: boolean = isObject<T>(keyOrMod);
    const primaryKey: string = isObject<T>(keyOrMod)
      ? keyOrMod[this.primaryKey]
      : keyOrMod;
    this.models = this.models.filter(m =>
      notPrimaryKey ? m !== keyOrMod : m[this.primaryKey] !== keyOrMod
    );
    this.toDel[primaryKey] = true;
    this.toCreate[primaryKey] = false;
    this.toUpdate[primaryKey] = false;
    return this;
  }

  /**
   * 更新model
   * @param {string|number} primaryValue
   * @param {Partial<T>} props
   * @return {Collection<T>}
   */
  public update(primaryValue: string, props: Partial<T>): Collection<T> {
    if (process.env.NODE_ENV === "development") {
      assert(
        isString(primaryValue) || isNumber(primaryValue),
        "Primary value must be String or Number instance"
      );
      assert(isObject(props), "Props must be a Object");
    }

    this.models = this.models.map(m =>
      m[this.primaryKey] === primaryValue
        ? ({ ...(m as object), ...(props as object) } as T)
        : m
    );

    // 如果在创建列表，则不需要写入更新列表
    if (!this.toCreate[primaryValue]) {
      this.toUpdate[primaryValue] = true;
    }
    return this;
  }

  /**
   * 添加model
   * @param {T} mod
   * @return {Collection<T>}
   */
  public add(mod: T): Collection<T> {
    if (process.env.NODE_ENV === "development") {
      assert(isObject(mod), "Model must be a Object");
    }
    if (mod[this.primaryKey] === void 0) {
      mod[this.primaryKey] = <any>generate();
    }

    this.models = this.models.concat(mod);
    this.toCreate[mod[this.primaryKey]] = true;
    return this;
  }

  /**
   * 排序
   * @param {Function} compare
   * @return {Collection<T>}
   */
  public sort(compare: (a: T, b: T) => number): Collection<T> {
    if (process.env.NODE_ENV === "development") {
      assert(isFunction(compare), "Compare must be a Function instance");
    }

    this.models = this.models.sort(compare);
    return this;
  }

  /**
   * 获取index位置的model
   * @param {number} index
   * @return {T|null}
   */
  public at(index: number): T | null {
    return this.models[index] || null;
  }

  /**
   * 获取最后一个model
   * @return {T}
   */
  public last(): T {
    return this.models[this.models.length - 1];
  }

  /**
   * 查找model
   * @param {Partial<T>} filter
   * @return {T|null}
   */
  public find(filter: Partial<T>): T | null {
    assert(isObject(filter), "Filter must be a Object");

    const FilterKeys = keys(filter);

    // 如果没有传入比较属性，直接返回null
    if (FilterKeys.length === 0) {
      return null;
    }

    return (
      find(this.models, mod => every(FilterKeys, k => filter[k] === mod[k])) ||
      null
    );
  }

  /**
   * 返回所有model
   * @return {T[]}
   */
  public get(): T[] {
    return this.models.slice();
  }

  /**
   * 将所有的model分为三类:toDelete\toUpdate\toCreate并返回
   * @return {{models: Array.<Object>, toDelete: Array, toUpdate: Array, toCreate: Array}}
   */
  public toJSON(): CollectionJSON<T> {
    const toDelete: T[] = [];
    const toUpdate: T[] = [];
    const toCreate: T[] = [];

    const md = this.toDel;
    const mu = this.toUpdate;
    const mc = this.toCreate;
    const primaryKey = this.primaryKey;
    const cache = this.cache;

    let key: string = null;

    this.models.forEach(m => {
      key = m[primaryKey];

      if (mu[key]) {
        toUpdate.push(m);
      }

      if (mc[key]) {
        toCreate.push(m);
      }
    });

    for (let key in md) {
      if (md[key] && cache[key]) {
        toDelete.push(cache[key]);
      }
    }

    return {
      models: this.models.slice(),
      toDelete,
      toUpdate,
      toCreate
    };
  }

  /**
   * @return {string}
   */
  public toString(): string {
    return "[object StoreCollection]";
  }
}
