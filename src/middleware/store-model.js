/**
 * Created on 29/04/2017.
 */

import Model from '../Model'

/**
 * <h2>管理model的中间件</h2>
 * <p>这是目前唯一的一个中间件，model实现方法还在探索中。</p>
 * @param mods
 * @return {Function}
 */
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
