/**
 * Created on 14/05/2017.
 */

import { Store, storeViewModelCreator } from '../src'
import { equal } from 'assert'

const Action = {
  add: 'add',
  reduce: 'reduce'
}

const vm = {
  name: 'vm',
  state: { count: 0 },
  /**
   * @this {ViewModel}
   * @param state
   * @param action
   * @param done
   */
  scheduler(state, action, done){
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

  const store = new Store()
  storeViewModelCreator([vm], store)
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
