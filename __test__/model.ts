/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

import { equal } from "assert"
import { Store } from "../src/core/impl/Store"
import storeModelCreator from "../src/build-in/model/impl"
import { Action } from "../src/core/inter/Action"
import { NextCallback } from "../src/core/inter/NextCallback"

interface TestModel {
  count: number
}

const Def: TestModel = {
  count: 0
}

const Actions = {
  add: 'add',
  reduce: 'reduce'
}

const actions = {
  add: function (state: TestModel, done: NextCallback<TestModel>): void {
    setTimeout(function () {
      done({ count: state.count + 1 })
    }, 200)
  }
}
const mod = {
  name: 'mod',
  state: { ...Def },
  scheduler: function (state: TestModel, action: Action, done: NextCallback<TestModel>): any {
    switch (action.type) {
      case Actions.add:
        return actions.add(state, done)
      case Actions.reduce:
        return { count: state.count - 1 }
      default:
        return state
    }
  }
}

const m1 = {
  name: 'm1',
  state: { ...Def },
  scheduler: function (state: TestModel): any {
    return { count: state.count + 1 }
  }
}

describe('storeModelCreator middleware', function () {

  interface TestModelStoreState {
    mod: TestModel
    m1: TestModel
  }

  const store = new Store<TestModelStoreState>()
  storeModelCreator([mod], store)
  store.initialize()

  it('Invoke add of actions when dispatch the add action', function (done) {

    store.subscribe(function observer(state: TestModelStoreState) {
      equal(state.mod.count, 1)
      done()
      store.unsubscribe(observer)
    })

    store.dispatch({ type: Actions.add })
  })

  it('Invoke reduce of actions when dispatch the reduce action', function (done) {

    store.subscribe(function observer(state: TestModelStoreState) {
      equal(state.mod.count, 0)
      done()
      store.unsubscribe(observer)
    })

    store.dispatch({ type: Actions.reduce })
  })

  it('Subscribe will Waiting for all model done', function (done) {
    storeModelCreator([m1], store)
    store.subscribe(function (state: TestModelStoreState) {
      equal(state.mod.count, 1)
      equal(state.m1.count, 1)
      done()
    })
    store.dispatch({ type: Actions.add })
  })
})