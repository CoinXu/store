/**
 * Created on 14/05/2017.
 */

import { Store, storeViewModelCreator } from '../src'
import { equal } from 'assert'

const Action = {
  add: 'add'
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
        this.store.dispatch({ type: Action.add })
        break
      default:
        return state
    }
  }
}

describe('storeViewModelCreator middleware', function () {

  const store = new Store()
  storeViewModelCreator([vm], store)
  store.initialize()

  it('View model can dispatch anytime', function (done) {
    let counter = 0
    store.subscribe(({ vm: { count } }) => {
      counter++
      if (counter === 2) {
        equal(count, 2)
        done()
      }
    })
    store.dispatch({ type: Action.add })
  })
})
