/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

import ViewModel, { ViewModelDescription } from "./ViewModel"
import Store from "../../Store"
import { Action, Next } from "../../interfaces"
import { map } from "../../utils/utils"

export default function storeViewModelCreator<T, U> (mods: Array<ViewModelDescription<T> | ViewModel<T>>, store: Store<U>): Store<U> {
  const vms = map<ViewModel<T>>(mods, function (m: ViewModel<T> | ViewModelDescription<T>) {
    return ViewModel.isViewModel<T>(m) ? m : new ViewModel<T>(m, store)
  })

  map(vms, function (mod: ViewModel<T>) {
    store.use(function (action: Action, state: U, next: Next<U>) {
      mod.receiver(action, state, next)
    })
  })

  return store
}
