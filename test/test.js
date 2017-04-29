/**
 * Created on 28/04/2017.
 */

import Store from '../src/Store'
import storeModelCreator from '../src/middleware/store-model'

const store = new Store()

// 使用 store-model 中间件定义一个model
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
      // 直接返回结果
      return { count: state.count + 1 }
    },
    reduce: function (state, done) {
      // 异步返回结果
      setTimeout(done, 300, { count: state.count - 1 })
    }
  }
}])

// 添加观察者
store.subscribe((next) => console.log(JSON.stringify(next)))

// 添加model
// model中不会做太多的业务数据处理，保持比较纯粹的数据请求->处理失败或成功->通知观察者
// 这样简单的逻辑
// 至于为什么这样做，当然是为了model共用！
// 比如定义了数据源model之后，其他模块都不必再定义了
// 要拿数据，调用 store.use(dataSource) 之后
// store.dispatch({type: 'getDataSourceList'})
// 即可
store.use(mw)

// 假设我们在fetch函数中添加了一个观察者
// 每次发送请求的时候通知观察者
// 那么我们可以在每次执行actions去确定当前是否为loading状态
// 以下为模拟loading状态的中间件
store.use(function (action, state, next) {
  next({ loading: new Date().getTime() % 2 === 0 })
})

// 为了达到view中完全不处理业务逻辑的目的
// 我们还可以再添加一个viewModel的中间件
// 不改变model，view中不处理数据
// 还可以实现一份model对不同的view的定制
store.use(function (action, state, next) {
  
  const { count } = state.mod
  const viewModel = { tips: '' }
  
  if (count > 2) {
    viewModel.tips = '骚年别玩了，手不累吗？'
  }
  
  if (count < 0) {
    viewModel.tips = '都为负了还按个啥！'
  }
  
  next({ viewModel })
})

store.initialize()
window.store = store


// 尝试在console面板中调用
// store.dispatch({type:'add'})
// store.dispatch({type:'reduce'})
