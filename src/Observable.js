/**
 * Created on 28/04/2017.
 */

import Observer from './Observer'

class Observable {
  constructor () {
    this.observer = null
  }
  
  onNext (data) {
    if (this.observer) {
      this.observer.onNext(data)
    }
    return this
  }
  
  onError (message) {
    if (this.observer) {
      this.observer.onError(message)
    }
    return this
  }
  
  subscribe (onNextOrObserver, onError) {
    this.observer = Observer.isObserver(onNextOrObserver)
      ? onNextOrObserver
      : new Observer(onNextOrObserver, onError)
    return this
  }
}

export default Observable