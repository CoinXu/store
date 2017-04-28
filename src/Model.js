/**
 * Created on 28/04/2017.
 */

import Observable from './Observable'
import { isUndefined, isPureObject, isString, isFunction, assert } from './utils'

class Model extends Observable {
  /**
   * @param {Object} record
   * @constructor
   */
  constructor (record) {
    super()
    const { name, reducer, state, actions } = record
    
    assert(isString(name), 'name must a string')
    assert(isFunction(reducer), 'reducer must a function')
    assert(isPureObject(state), 'state must a pure object')
    
    this.actions = {}
    this.name = name
    this.reducer = reducer
    this.state = state
    this.record = record
    
    this.done = this.done.bind(this)
    this.receiver = this.receiver.bind(this)
    
    this.proxy(actions)
  }
  
  proxy (origin) {
    const { actions } = this
    for (let key in origin) {
      if (!origin.hasOwnProperty(key)) continue
      actions[key] = this.createProxy(key)
    }
    return this
  }
  
  createProxy (key) {
    return function () {
      const origin = Array.prototype.slice.call(arguments)
      const args = origin.concat(this.state, this.done)
      return this.record.actions[key].apply(this, args)
    }.bind(this)
  }
  
  receiver (action) {
    const next = this.reducer.call(this, this.state, action)
    if (!isUndefined(next)) {
      this.done(next)
    }
    return this
  }
  
  done (state) {
    assert(isPureObject(state), 'state must a pure object')
    
    this.state = Object.assign({}, this.state, state)
    
    this.onNext({
      name: this.name,
      state: this.state
    })
    
    return this
  }
  
  static isModel (ins) {
    return ins instanceof Model
  }
}

export default Model
