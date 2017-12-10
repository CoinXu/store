[![Build Status](https://travis-ci.org/CoinXu/store.svg?branch=master)](https://travis-ci.org/CoinXu/store)
[![npm version](https://badge.fury.io/js/sugo-store.svg)](https://badge.fury.io/js/sugo-store)

# 概述
Store是一个JavaScript状态管理器,主要特性如下:
+ 任意组合多个action,实现业务流程控制
+ Model独立,高可复用,通常一个Model只用定义一次,可在整个项目中使用
+ 单独的ViewModel,与Model完全隔离
+ Collection相关操作
+ Validator

# Store致力于解决两个问题：
### 流程控制
Store认为:

1. 业务流程是有序或独立的，比如`A->B->C`或`A|B|C`，一旦业务确定，不太可能出现`C->A->B`这样乱序的触发顺序。
2. 在action遵从**最小粒度**设计原则的情况下，一定会出现一个业务流程需要多个action组合完成。
   所以Store可以一次派发多个action. 如：`store.dispatch([{type: 'action a'}, {type: 'action b'}])`
3. 可能需要知道当前派发的action执行结果，根据结果来执行下一步操作。所以为`dispatch`函数增加了`callback`参数。

### 重拾在mvvm框架大规模普及下遗失的model
由于MVVM可以极方便的将model映射到view，所以很多项目中并没有model的存在，而是将接口数据转换后直接写入到view model。
但在大一些项目中，model数以百计，接口数以千计，如果还是以接口->view model这样的数据管理方式，
将会造成灾难性的后果，抛开代码量增加、同一逻辑多次实现的问题不谈，如果某一接口或model发生了不兼容更新，对维护而言将会造成灾难性的后果。
所以Store强烈建议将model及相关接口单独抽离，以实现复用与统一维护。

基于以上考虑，Store使用[中间件](https://coinxu.github.io/store/docs/store.html#中间件)的设计模式处理业务流程，
使用数组管理所有的中间件，当一个行为发生的，依次通知这些中间件，所有中间件处理完成后，得到最终结果。
执行到某一个中间件时，Store保证其前面的中间件已经执行完成，此时可以直接使用前面中间件产生的结果。

# 示例
假设有这样的业务流程:

1. 使用`user_id`查询用户信息
2. 使用用户信息中的`group_id`查询用户所属用户组的信息

```ts
// typescript
import { Store } from 'strore'

interface User {
  id: string
  name: string
  group_id: string
}
interface Group {
  id: string
  name: string
}
interface State {
  user: User
  group: Group
}

const store = new Store<State>()
enum Action = { initialize = 'INITIALIZE' }

// 1. 定义user相关中间件
store.use(function(action, state, next){
    const { type, payload } = action
    switch (type) {
      // 查询用户数据
      case Action.initialize:
        window
          .fetch(`/api/user/${payload}/info`)
          .then(user => next({ user }))
        break
      default:
        next()
    }
})

// 2. 定义用户组中间件
store.use(function(action, state, next){
  const { type, payload } = action
  switch (type) {
    // 由于中间件是有序执行的，所以此时state.user已经获取到了,可以直接使用
    case Action.initialize:
      window
        .fetch(`/api/group/${state.user.group_id}/info`)
        .then(group => next({ group }))
      break
    default:
      next()
  }
})

// 派发初始化action
store.dispatch({
  type: Action.initialize,
  payload: 'user_record_id'
}, state => console.log(state.user, state.group))
```
上面的代码是Store最基本的示例，实际上Store提供了一些基础的中间件来更好的组织代的代码。
比如`storeViewModelCreator`,`StoreValidatorCreator`等

## 运行环境
所有支持es3的环境。包括不限于：
+ 浏览器: ie7+
+ nodejs: 所有版本

## 详细文档
[https://coinxu.github.io/store/docs/home.html](https://coinxu.github.io/store/docs/home.html)

## TODO
+ Example
+ English Docs

## LICENSE
MIT
