[![Build Status](https://travis-ci.org/CoinXu/store.svg?branch=master)](https://travis-ci.org/CoinXu/store)
[![npm version](https://badge.fury.io/js/sugo-store.svg)](https://badge.fury.io/js/sugo-store)

# 概述
Store是一个JavaScript状态管理器,主要特性如下:
+ 任意组合多个action,实现业务流程控制
+ Model独立,高可复用,通常一个Model只用定义一次,可在整个项目中使用
+ 单独的ViewModel,与Model完全隔离
+ Collection相关操作
+ 验证器

# 为什么造轮子？
[Redux](https://github.com/reactjs/redux)是一个很好的东西，但并不适用与一些特殊的场景。
如果一个store上有多个reducer时，当一个action被派发时,redux会将action以`for in`的顺序分别传递给每个reducer。
从所周知`for in`是无序的，这样的设计对A依赖于B这样的业务场景不太友好。

当然也可以选择在某一个action中做更多的事情从而不用理会具体的执行顺序,但这样的设计破坏了action的**最小粒度**设计原则。
通常将action的粒度设置得越小，越方便组合，可复用性，可维护性都会提到提升。

[Store](https://github.com/CoinXu/store)设计方案不同于redux，
Store认为每个action都是有序或独立的，比如`A->B->C`或`A`,`B`,`C`，
一旦业务确定，不太可能出现`C->A->B`这样乱序的触发顺序。

所以Store使用数组管理所有的[中间件](#middleware)，当一个行为发生的，依次通知这些中间件，所有中间件处理完成后，得到最终结果.
执行到某一个中间件时,Store保证其前面的中间件已经执行完成,此时可以直接使用前面中间件产生的结果.

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

## 详细文档
+ [API](https://coinxu.github.io/store/docs/home.html)

## TODO
+ Example
+ English Docs

## LICENSE
MIT