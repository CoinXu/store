/**
 * Created on 29/04/2017.
 */

import ViewModel from './ViewModel'

/**
 * <h2>管理model的中间件</h2>
 * <p>这是目前唯一的一个中间件，model实现方法还在探索中。</p>
 * @param {Array<ViewModel|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeViewModelCreator (mods, store) {
  mods
    .map(m => ViewModel.isModel(m) ? m : new ViewModel(m, store))
    .map(mod => {
      store.use(function (action, state, next) {
        mod.receiver(action, state, next)
      })
    })
  return store
}

export default storeViewModelCreator
