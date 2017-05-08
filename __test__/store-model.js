/**
 * Created on 01/05/2017.
 */

import { Store, storeModelCreator } from '../src'
import { equal } from 'assert'

const Actions = {
  add: 'add',
  reduce: 'reduce'
}

const actions = {
  add: function (state, done) {
    setTimeout(done, 200, { count: state.count + 1 })
  }
}
const mod = {
  name: 'mod',
  state: { count: 0 },
  scheduler: function (state, action, done) {
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
  state: { count: 0 },
  scheduler: function (state) {return { count: state.count + 1 }}
}

describe('storeModelCreator middleware', function () {

  const store = new Store()
  storeModelCreator([mod], store)
  store.initialize()

  it('Invoke add of actions when dispatch the add action', function (done) {

    store.subscribe(function (state) {
      equal(state.mod.count, 1)
      done()
    })

    store.dispatch({ type: Actions.add })
  })

  it('Invoke reduce of actions when dispatch the reduce action', function (done) {

    store.subscribe(function (state) {
      equal(state.mod.count, 0)
      done()
    })

    store.dispatch({ type: Actions.reduce })
  })

  it('Subscribe will Waiting for all model done', function () {
    storeModelCreator([m1], store)
    store.subscribe(function (state) {
      equal(state.mod.count, 1)
      equal(state.m1.count, 1)
      done()
    })
    store.dispatch({ type: Actions.add })
  })

})
