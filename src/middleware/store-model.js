/**
 * Created on 29/04/2017.
 */

import Model from './Model'

/**
 * <h2>管理model的中间件</h2>
 * <p>这是目前唯一的一个中间件，model实现方法还在探索中。</p>
 * @param mods
 * @return {Function}
 */
function storeModelCreator (mods) {
  
  mods = mods
    .map(mod => Model.isModel(mod) ? mod : new Model(mod))
    .map(mod => mod.subscribe(observer))
  
  const length = mods.length
  let storeState, storeNext, count = 0, next = {}, temp = null
  
  function observer (state) {
    count = count + 1
    Object.assign(next, state)
    // 所有的model都done的时候再执行storeNext
    if (count === length && storeNext) {
      temp = Object.assign({}, next)
      count = 0
      next = {}
      storeNext(temp)
      temp = null
    }
  }
  
  return function (action, state, next) {
    storeState = state
    storeNext = next
    mods.forEach(mod => mod.receiver(action))
  }
}

export default storeModelCreator
