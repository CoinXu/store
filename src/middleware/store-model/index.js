/**
 * Created on 29/04/2017.
 */

import Model from './Model'

/**
 * <h2>管理model的中间件</h2>
 * <p>这是目前唯一的一个中间件，model实现方法还在探索中。</p>
 * @param {Array<Model|Object>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeModelCreator (mods, store) {
  mods
    .map(m => Model.isModel(m) ? m : new Model(m))
    .map(mod => {
      store.use(function (action, state, next) {
        mod.receiver(action, state, next)
      })
    })
  return store
}

export default storeModelCreator
