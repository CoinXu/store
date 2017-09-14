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

  store.use(function (action, state, next) {
    desc.scheduler(action, collection, function (props) {
      const ret = { list: collection.get() }
      if (isObject(props)) {
        assert(props.list === void 0, 'Props can not have a key which named [list]')
        Object.assign(ret, props)
      }
      next({ [desc.name]: ret })
    })
  })

  return store
}
