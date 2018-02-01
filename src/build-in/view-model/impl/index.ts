/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   01/02/2018
 * @description
 */
import { ViewModel } from "./ViewModel"
import { Description } from "../inter/Description"
import { Store } from "../../../core/impl/Store"
import { Action } from "../../../core/inter/Action"
import { NextCallback } from "../../../core/inter/NextCallback"
import { Middleware } from "../../../core/inter/Middleware"
import { map } from "../../../core/impl/compatible"

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