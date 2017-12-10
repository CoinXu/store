/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   27/11/2017
 * @description
 */

import Collection from "./Collection"
import { isObject, assert, assign } from "../../utils/utils"
import { Action, Next } from "../../interfaces"
import Store from "../../Store"

export interface CollectionState<T> {
  list: T[]

  [key: string]: any
}

export interface CollectionScheduler<T> {
  (this: Store<any>, action: Action, colect: Collection<T>, next: (props?: Partial<CollectionState<T>>) => any): any
}

export interface CollectionDesc<T> {
  name: string
  primaryKey: keyof T
  scheduler: CollectionScheduler<T>
}

/**
 * @param {CollectionDesc} desc
 * @param {Store} store
 */
export default function <T> (desc: CollectionDesc<T>, store: Store<any>): Store<any> {
  const collection: Collection<T> = new Collection<T>(desc.primaryKey)
  const state: CollectionState<T> = { list: collection.get() }

  store.use(function (action: Action, storeState: any, next: Next<any>) {
    desc.scheduler.call(store, action, collection, function (props: CollectionState<T>) {
      state.list = collection.get()

      if (isObject(props)) {
        if (process.env.NODE_ENV === "development") {
          assert(props.list === void 0, 'Props can not have a key which named [list]')
        }

        assign(state, props)
      }

      next({ [desc.name]: state })
    })
  })

  return store
}
