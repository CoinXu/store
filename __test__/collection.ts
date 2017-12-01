/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   27/11/2017
 * @description
 */
import { Store, storeCollectionCreator, Collection } from '../src'
import { Action } from "../src/interfaces"
import { equal } from 'assert'
import "mocha"
import { CollectionDesc, CollectionScheduler, CollectionState } from '../src/middleware/collection'


interface Mod {
  name: string
  id: string
}

function creator(name: string, id: string): Mod {
  return { name, id }
}

describe('Collection method sample', function () {

  const col = new Collection<Mod>('id')

  it('Collection.add', function () {
    col.add(creator('a', '0'))
    col.add(creator('b', '1'))

    const mods = col.get()
    equal(mods.length, 2)
    equal(mods[0].name, 'a')
    equal(mods[1].name, 'b')
    equal(mods[0].id, '0')
    equal(mods[1].id, '1')

    const json = col.toJSON()
    equal(json.toCreate.length, 2)
    equal(json.toDelete.length, 0)
    equal(json.toUpdate.length, 0)
  })

  it('Collection.update', function () {
    col.update('0', { name: 'aa' })
    const mod = col.find({ id: '0' })
    equal(mod.name, 'aa')

    const json = col.toJSON()

    equal(json.toCreate.length, 2)
    equal(json.toDelete.length, 0)
    equal(json.toUpdate.length, 0)
  })

  it('Collection.reset', function () {
    col.reset(col.get())
    const json = col.toJSON()

    equal(json.toCreate.length, 0)
    equal(json.toDelete.length, 0)
    equal(json.toDelete.length, 0)
    equal(json.models.length, 2)
  })

  it('Collection.sort', function () {
    col.sort(function (a: Mod, b: Mod) {
      return parseInt(b.id) - parseInt(a.id)
    })

    const mods = col.get()
    equal(mods[0].id, 1)
    equal(mods[1].id, 0)
  })

  it('Collection.at', function () {
    equal(col.at(0).id, 1)
    equal(null, col.at(3))
  })

  it('Collection.last', function () {
    equal(col.last().id, 0)
  })

  it('Collection.find', function () {
    equal(col.find({ id: "0" }).id, 0)
    equal(col.find({ id: "-1" }), null)
    equal(col.find({}), null)
  })

  it('Collection.get', function () {
    equal(col.get().length, 2)
  })

  it('Collection.toString', function () {
    equal(col.toString(), '[object StoreCollection]')
  })

  it('Collection.toJSON', function () {
    const json = col.toJSON()

    equal(json.toCreate.length, 0)
    equal(json.toDelete.length, 0)
    equal(json.toDelete.length, 0)
    equal(json.models.length, 2)
  })

  it('Collection.remove', function () {
    col.remove("0")
    equal(col.get().length, 1)
  })
})

describe("Collection complex operate", function () {
  const def = [
    creator('a', "0"),
    creator('b', "1"),
    creator('c', '2'),
    creator('d', "3")
  ]
  const col = new Collection('id', def)

  it('Collection initialize with four items', function () {
    equal(col.get().length, 4)
    const json = col.toJSON()
    equal(json.models.length, 4)
    equal(json.toCreate.length, 0)
    equal(json.toUpdate.length, 0)
    equal(json.toDelete.length, 0)
  })

  it('Collection.add Collection.remove Collection.update', function () {
    col.sort(function (a, b) {
      return parseInt(b.id) - parseInt(a.id)
    })

    // remove
    col.remove(col.at(0))
    equal(col.find({ id: "3" }), null)
    equal(col.get().length, 3)

    // update
    col.update("2", { name: 'cc' })
    equal(col.find({ id: "2" }).name, 'cc')

    // add
    col.add({ name: 'e', id: "4" })
    col.add({ name: 'f', id: "5" })
    equal(col.get().length, 5)

    // remove item that added
    col.remove("5")
    equal(col.get().length, 4)

    const json = col.toJSON()

    equal(json.models.length, 4)
    equal(json.toCreate.length, 1) // id:4
    equal(json.toCreate[0].id, 4)

    equal(json.toUpdate.length, 1) // id:2
    equal(json.toUpdate[0].id, 2)

    equal(json.toDelete.length, 1) // id:3
    equal(json.toDelete[0].id, 3)
  })
})

describe("storeCollectionCreator middleware", function () {
  interface User {
    id: string
    name: string
    age: number
    message?: string
  }

  const scheduler: CollectionScheduler<User> = function (action: Action, collection, next) {
    const { type, payload } = action
    switch (type) {
      case 'ADD':
        this.dispatch({ type: '', payload: '' })
        collection.add(payload)
        next()
        break
      case 'REMOVE':
        collection.remove(payload.id)
        next()
        break
      case 'MESSAGE':
        next({ message: payload.message })
        break
      default:
        next()
    }
  }

  const Desc: CollectionDesc<User> = {
    name: 'user',
    primaryKey: 'id',
    scheduler
  }

  const store = new Store<{ user: CollectionState<User> }>()
  storeCollectionCreator(Desc, store)

  it('add one item to collection', function (done) {
    store.dispatch({ type: 'ADD', payload: { name: 'a', id: 0 } }, function (state) {
      equal(state.user.list.length, 1)
      equal(state.user.list[0].name, 'a')
      done()
    })
  })

  it('remove one from collection', function (done) {
    store.dispatch({ type: 'REMOVE', payload: { id: 0 } }, function (state) {
      equal(state.user.list.length, 0)
      done()
    })
  })

  it('dispatch a message action', function () {
    const message = 'example message'
    store.dispatch({ type: 'MESSAGE', payload: { message } }, function (state) {
      equal(state.user.message, message)
    })
  })
})