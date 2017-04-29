/**
 * Created on 28/04/2017.
 */

import { noop } from './utils/utils'

class Observer {
  /**
   * @param {Function} onNext
   * @param [onError]
   */
  constructor (onNext, onError) {
    this.next = onNext || noop
    this.error = onError || noop
  }
  
  onNext (data) {
    this.next(data)
    return this
  }
  
  onError (message) {
    this.error(message)
    return this
  }
  
  static isObserver (ins) {
    return ins instanceof Observer
  }
}

export default Observer