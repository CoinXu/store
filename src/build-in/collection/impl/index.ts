/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   31/01/2018
 * @description
 */

import { Collection } from "./Collection"
import { Description } from "../inter/Description"
import { CollectionState } from "../inter/CollectionState"
import { Store } from "../../../core/impl/Store"
import { Action } from "../../../core/inter/Action"
import { NextCallback } from "../../../core/inter/NextCallback"
import { Middleware } from "../../../core/inter/Middleware"
import { assert, isObject } from "../../../core/impl/utils"
import { assign } from "../../../core/impl/compatible"

export default function <T>(description: Description<T>, store: Store<any>): Store<any> {

  const collection: Collection<T> = new Collection<T>(description.primaryKey)
  const state: CollectionState<T> = {
    list: collection.get()
  }

  store.use(<Middleware<any>>function (action: Action, storeState: any, next: NextCallback<any>) {
    description.scheduler.call(store, action, collection, function (props: CollectionState<T>) {
      state.list = collection.get()

      if (isObject(props)) {
        if (process.env.NODE_ENV === "development") {
          assert(props.list === void 0, 'Props can not have a key which named [list]')
        }
        assign(state, props)
      }

      next({ [description.name]: state })
    })
  })

  return store
}