/**
 * Created on 28/04/2017.
 */

import Observable from './Observable'
import { warning, isPureObject, isString, isFunction, assert } from './utils/utils'
import compose  from './utils/compose'

const DefAction = { type: '__COLLECTION__INITIALIZE__ACTION__' }

class Store extends Observable {
  constructor () {
    super()
    this.mw = []
    this.state = {}
    this.onError = this.onError.bind(this)
    this.onNext = this.onNext.bind(this)
  }
  
  initialize (action = DefAction) {
    this.dispatch(action)
  }
  
  dispatch (action) {
    assert(isPureObject(action), 'action must be a pure object')
    warning(isString(action.type), 'type of action must be a string')
    
    let state = Object.assign({}, this.state)
    let next = Object.assign({}, this.state)
    
    // 只能返回新的数据
    // 不能改变state
    Object.freeze(state)
    
    const processor = (result) => next = Object.assign({}, next, result)
    const complete = () => {
      this.state = next
      // TODO 异步队列执行
      this.onNext(next)
    }
    
    compose(this.mw)(action, state, processor, complete)
    return this
  }
  
  use (mw) {
    assert(isFunction(mw), 'Middleware must be composed of functions')
    this.mw.push(mw)
    return this
  }
}

export default Store
