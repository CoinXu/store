/**
 * Created on 01/05/2017.
 */

import { Store, storeCollectionCreator } from '../src'
import Model from '../src/middleware/store-model/Model'
import CollectionModel from '../src/middleware/store-model-collection/CollectionModel'
import { equal } from 'assert'

const generate = function (prefix) {
  let count = 0
  const r = prefix || 'UNIQUE_ID' + '_'
  return function () {
    return r + count++
  }
}

const userid = generate('USER_ID')
const name = generate('USER_NAME')
const usermodel = generate('USER_MODEL')

const generateUserModel = function () {
  return {
    id: userid(),
    name: name(),
    age: 10
  }
}

const UserModelActions = {
  add: 'add',
  reduce: 'reduce'
}

function scheduler (state, action, done) {
  switch (action.type) {
    case UserModelActions.add:
      return { age: state.age + 1 }
    case UserModelActions.reduce:
      setTimeout(function () {
        done({ age: state.age - 1 })
      }, 100)
      break
    default:
      return state
  }
}

function userModelDescCreator (name) {
  return {
    name,
    scheduler,
    state: generateUserModel()
  }
}

const userDesc = userModelDescCreator('USER_MODEL_NAME_0')
const mod = new CollectionModel(userDesc)

const CollectionActions = {
  add: 'COLLECTION_ADD',
  reduce: 'COLLECTION_REDUCE'
}
const collectionDesc = {
  name: 'USER_MODEL_COLLECTION',
  /**
   * @this {Collection}
   * @param state
   * @param action
   * @param storeState
   * @param done
   */
  scheduler: function (state, action, storeState, done) {
    switch (action.type) {
      case CollectionActions.add:
      case CollectionModel.reduce:
        return this.dispose(action, action.id, done, storeState)
    }
  },
  mod
}

const store = new Store()
const collection = storeCollectionCreator([collectionDesc], store)

