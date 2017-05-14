/**
 * Created on 29/04/2017.
 */

import ViewModel from './ViewModel'

/**
 * 管理`viewModel`中间件
 * @param {Array<ViewModel|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeViewModelCreator (mods, store) {
  mods
    .map(m => ViewModel.isViewModel(m) ? m : new ViewModel(m, store))
    .map(mod => store.use((action, state, next) => mod.receiver(action, state, next)))
  return store
}

export default storeViewModelCreator
