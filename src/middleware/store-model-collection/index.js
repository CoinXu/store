/**
 * Created on 29/04/2017.
 */

import Collection from './Collection'

/**
 * <h2>管理`Collection`的中间件</h2>
 * <p>`Collection`设计还在探索中</p>
 * @param {Array<Collection|CollectionDesc>} collections
 * @param {Store} store
 * @return {Store}
 */
function storeCollectionCreator (collections, store) {
  collections
    .map(c => Collection.isCollection(c) ? c : new Collection(c))
    .map(c => store.use((action, state, next) => c.receiver(action, state, next)))
  return store
}

export default storeCollectionCreator
