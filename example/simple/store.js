/**
 * Created on 29/04/2017.
 */

import { storeModelCreator, Store } from '../../src'

// 定义一个简单的model
const mod = {
  name: 'mod',
  state: { count: 0 },
  scheduler: function (state, action) {
    switch (action.type) {
      case 'add':
        return { count: state.count + 1 }
      case 'reduce':
        return { count: state.count - 1 }
      default:
        return state
    }
  }
}

const store = new Store()
storeModelCreator([mod], store)
store.initialize()

export default store

