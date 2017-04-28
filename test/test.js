/**
 * Created on 28/04/2017.
 */

import Store from '../src/Store'

const store = new Store()
debugger
store.store({
  name: 'mod',
  state: { count: 0 },
  reducer: function (state, action) {
    switch (action.type) {
      case 'add':
        return this.actions.add()
      case 'reduce':
        return this.actions.reduce()
      default:
        return state
    }
  },
  actions: {
    add: function (state) {
      return { count: state.count + 1 }
    },
    reduce: function (state, done) {
      done({ count: state.count - 1 })
    }
  }
})

window.store = store
store.subscribe((next) => console.log(JSON.stringify(next)))
store.dispatch({ type: 'add' })