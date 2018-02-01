/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   26/11/2017
 * @description
 */

// import { Store, storeViewModelCreator } from '../src'
// import { Action, Next } from '../src/interfaces'
import { equal } from 'assert'
import { Store } from "../src/impl/Store"
import { Action } from "../src/inter/Action"
import { NextCallback as Next } from "../src/inter/NextCallback"
import storeViewModelCreator from "../src/build-in/view-model/impl"

const Action = {
  add: 'add',
  reduce: 'reduce'
}

interface State {
  count: number
}

const vm = {
  name: 'vm',
  state: <State>{ count: 0 },
  /**
   * @this {ViewModel}
   * @param state
   * @param action
   * @param done
   */
  scheduler(state: State, action: Action, done: Next<State>) {
    switch (action.type) {
      case Action.add:
        done({ count: state.count + 1 })
        this.store.dispatch({ type: Action.reduce })
        break
      case Action.reduce:
        return { count: state.count - 1 }
      default:
        return state
    }
  }
}

describe('storeViewModelCreator middleware', function () {

  interface VM {
    vm: State
  }

  const store = new Store<VM>()
  storeViewModelCreator<State, VM>([vm], store)
  store.initialize()

  let counter = 0
  it('View model can dispatch anytime', function (done) {
    store.subscribe(({ vm: { count } }) => {
      counter++
      if (counter === 2) {
        equal(count, 0)
        done()
      }
    })
    store.dispatch({ type: Action.add })
  })
})