/**
 * Created on 30/05/2017.
 * @file model集全管理
 */

import { assert, isString, isFunction, isArray } from '../../utils/utils'
import Model from './CollectionModel'

/**
 * @typedef {object} CollectionDesc
 * @property {string} name
 * @property {scheduler} scheduler
 * @property {CollectionModel} mod
 */

/**
 * @class
 * ModelCollection 类
 * 传入该类的管理model需要满足如下条件：
 * 1. model.isModel方法存在，并返回 boolean 值
 * 2. 每一个model的内容必须包含一个唯一的id
 */
class Collection {
  /**
   * @param {CollectionDesc} desc
   */
  constructor (desc) {

    const { name, scheduler, mod } = desc

    assert(isString(name), 'name must be a string')
    assert(isFunction(scheduler), 'scheduler must be a function')
    assert(Model.isModel(mod), 'model must instance of CollectionModel')

    this.name = name
    this.mod = mod
    this.scheduler = scheduler
    /** @type {Array<CollectionModel>} */
    this.state = []
  }

  /**
   * 新增一个model
   * @param {CollectionModel|ModelDesc} descOrModel
   * @return {Collection}
   */
  add (descOrModel) {
    this.state.push(Model.isModel(descOrModel) ? descOrModel : this.mod.create(descOrModel))
    return this
  }

  /**
   * 删除一个model
   * @param {CollectionModel|string|number} idOrModel
   * @return {Collection}
   */
  remove (idOrModel) {
    const id = Collection.getModelId(idOrModel)
    this.state = this.state.filter(m => m.id !== id)
    return this
  }

  /**
   * 通过查找一个model
   * @param {string|number} id
   * @return {CollectionModel|null}
   */
  get (id) {
    return this.state.find(m => m.id === id)
  }

  /**
   * 获取所有的Model
   * @return {Array.<CollectionModel>}
   */
  list () {
    return this.state.slice()
  }

  /**
   * @param {function} iterator
   * @param {*} scope
   */
  forEach (iterator, scope) {
    return this.state.forEach(iterator, scope)
  }

  /**
   * @param {function} iterator
   * @param {*} scope
   * @return {Array}
   */
  map (iterator, scope) {
    return this.state.map(iterator, scope)
  }

  /**
   * 如果scheduler返回一个Array，则会立即调用next方法
   * @param {object} action
   * @param {object} storeState
   * @param {function} next
   * @return {Collection}
   */
  receiver (action, storeState, next) {
    const done = state => this.done(state, next)
    const state = this.scheduler.call(this, this.state, action, storeState, done)
    if (isArray(state)) done(state)
    return this
  }

  /**
   * @param {Array} state
   * @param {function} next
   * @return {Collection}
   */
  done (state, next) {
    assert(isArray(state), 'state must be a array')
    next({ [this.name]: this.state })
    return this
  }

  dispose (action, idOrModel, done, storeState) {
    const id = Collection.getModelId(idOrModel)
    const mod = this.get(id)
    if (mod) {
      mod.receiver(action, storeState, done)
    }
    return this
  }

  /**
   * @param {CollectionModel|string|number} idOrModel
   */
  static getModelId (idOrModel) {
    return Collection.isModel(idOrModel) ? idOrModel.id : idOrModel
  }

  /**
   * @param ins
   * @return {boolean}
   */
  static isCollection (ins) {
    return ins instanceof Collection
  }
}

export default Collection

