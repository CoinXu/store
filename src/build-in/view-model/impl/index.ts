/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */
import { ViewModel } from "./ViewModel"
import { Description } from "../inter/Description"
import { Store } from "../../../impl/Store"
import { Action } from "../../../inter/Action"
import { NextCallback } from "../../../inter/NextCallback"
import { Middleware } from "../../../inter/Middleware"
import { map } from "../../../impl/compatible"

export type CreatorArg<T, U> = ViewModel<T, U> | Description<T>

export default function storeViewModelCreator<T, U>(mods: CreatorArg<T, U>[], store: Store<U>): Store<U> {

  const vms = map<CreatorArg<T, U>, ViewModel<T, U>>(mods, function (m: CreatorArg<T, U>): ViewModel<T, U> {
    return ViewModel.isViewModel<T, U>(m) ? m : new ViewModel<T, U>(m, store)
  })

  map(vms, function (vm: ViewModel<T, U>) {
    store.use(<Middleware<U>>function (action: Action, state: U, next: NextCallback<U>): void {
      vm.receiver(action, state, next)
    })
  })

  return store
}