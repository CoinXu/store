/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

import ViewModel, { ViewModelDescription } from "./ViewModel"
import Store from "../../Store"
import { Action, Next } from "../../interfaces"

export default function storeViewModelCreator<T, U>(
  mods: Array<ViewModelDescription<T> | ViewModel<T>>,
  store: Store<U>
): Store<U> {
  mods
    .map((m: ViewModel<T> | ViewModelDescription<T>) => ViewModel.isViewModel<T>(m) ? m : new ViewModel<T>(m, store))
    .map((mod: ViewModel<T>) => store.use((action: Action, state: U, next: Next<U>) => mod.receiver(action, state, next)))
  return store
}