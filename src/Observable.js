/**
 * Created on 28/04/2017.
 */

import { assert, noop, isFunction } from './utils/utils'

class Observable {
  constructor () {
    this.observer = noop
  }
  
  onNext (data) {
    this.observer(data)
    return this
  }
  
  subscribe (observer) {
    assert(isFunction(observer), 'observer must be a function')
    this.observer = observer
    return this
  }
}

export default Observable