/**
 * Created on 29/04/2017.
 */

import Model from './Model'

/**
 * <h2>管理`model`的中间件</h2>
 * <p>`model`设计还在探索中</p>
 * @param {Array<Model|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeModelCreator (mods, store) {
  mods
    .map(m => Model.isModel(m) ? m : new Model(m))
    .map(mod => store.use((action, state, next) => mod.receiver(action, state, next)))
  return store
}

export default storeModelCreator
