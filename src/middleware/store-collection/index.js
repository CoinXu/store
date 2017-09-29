/**
 * @Author sugo.io<asd>
 * @Date 17-9-14
 */

import Collection from './Collection'
import { isObject, assert } from '../../utils/utils'

/**
 * @param {CollectionDesc} desc
 * @param {Store} store
 */
export default function (desc, store) {
  const collection = new Collection(desc.primaryKey)
  const state = { list: collection.get() }

  store.use(function (action, storeState, next) {
    desc.scheduler.call(store, action, collection, function (props) {
      state.list = collection.get()

      if (isObject(props)) {
        assert(props.list === void 0, 'Props can not have a key which named [list]')
        Object.assign(state, props)
      }

      next({ [desc.name]: state })
    })
  })

  return store
}
