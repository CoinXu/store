/**
 * @Author sugo.io<asd>
 * @Date 17-9-14
 */

import Collection from './Collection'

/**
 * @param {CollectionDesc} desc
 * @param {Store} store
 */
export default function (desc, store) {
  const collection = new Collection(desc.primaryKey)

  store.use(function (action, state, next) {
    desc.scheduler(action, collection, function () {
      next({ [desc.name]: collection.get() })
    })
  })

  return store
}
