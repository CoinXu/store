/**
 * Created on 28/04/2017.
 */

import Store from '../src/Store'
import storeModelCreator from '../src/middleware/store-model'

const store = new Store()
const mw = storeModelCreator([{
  name: 'mod',
  state: { count: 0 },
  scheduler: function (state, action) {
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
}])

window.store = store
store.subscribe((next) => console.log(JSON.stringify(next)))
store.use(mw)
// 假设我们在fetch函数中添加了一个观察者
// 每次发送请求的时候通知观察者
// 那么我们可以在每次执行actions去确定当前是否为loading状态
// 以下为模拟loading状态的中间件
store.use(function (action, state, next) {
  next({ loading: new Date().getTime() % 2 === 0 })
})
store.initialize()
