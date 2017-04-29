/**
 * Created on 29/04/2017.
 */

import Model from '../Model'

function storeModelCreator (mods) {
  mods = mods
    .map(mod => Model.isModel(mod) ? mod : new Model(mod))
    .map(mod => mod.subscribe(onNext, onError))
  
  const store = {
    state: null,
    next: null
  }
  
  function onNext (state) {
    if (store.next) {
      store.next(Object.assign({}, store.state, state))
    }
  }
  
  function onError (message) {
    onNext({ message })
  }
  
  return function (action, state, next) {
    store.state = state
    store.next = next
    mods.forEach(mod => mod.receiver(action))
  }
}

export default storeModelCreator
