[![Build Status](https://travis-ci.org/CoinXu/store.svg?branch=master)](https://travis-ci.org/CoinXu/store)
[![npm version](https://badge.fury.io/js/sugo-store.svg)](https://badge.fury.io/js/sugo-store)


# 概述
Store是一个JavaScript状态管理器，包含了流程控制。

# 为什么造轮子？
[Redux](https://github.com/reactjs/redux) 是一个很好的东西，但并不适用与一些特殊的场景。
当分派一个`action`，如果一个`store`上有多个`reducer`，redux会将其以`for in`的方式分别传递给每个`reducer`。
大家所知道的是，`for in`是无序的，这样的设计对A依赖于B这样的业务场景不太友好。

比如：
1. 通过`user_id`获取一个用户信息，所得结果包含用户所在的分组字段`group_id`。
2. 通过`group_id`查询分组的信息。

如果用redux，你的代码应大致如下：
```js
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'

// define actions
function fetch_user(user_id) {
  return async dispatch =>
    fetch(`/api/user/${user_id}/info`)
      .then(user => dispatch({type: 'USER_INFO_INIT', payload: user})
}

function fetch_group(group_id) {
  return async dispath =>
    fetch(`/api/group/${group_id}/info`)
      .then(group => dispath({type: 'GROUP_INFO_INIT', payload: group}))
}

// define reducer
function user(state = {}, action) {
  if(action.type === 'USER_INFO_INIT'){
    return action.payload
  }
  return state
}

function group(state = {}, action){
  if(action.type === 'GROUP_INFO_INIT'){
    return action.payload
  }
}

// combine reducer
const reducer = combineReducers({user, group})
const store = createStore(reducer, applyMiddleware(thunkMiddleware))

// 请求user信息
bindActionCreators(fetch_user, store.dispatch)('user_id')
// 在某个位置检测`state.user.group_id`并请求`group`信息：
bindActionCreators(fetch_group, store.dispatch)(state.user.group_id)
```

当然也可以选择在初始化action中将请求一次获取过来。但这样的设计破坏了action的`最小粒度`设计原则。
通常将action的粒度设置得越小，越方便组合，可复用性，可维护性都会提到提升。

[Store](https://github.com/CoinXu/store) 设计方案不同于redux，
Store认为每个action都是有序或独立的，比如`A->B->C`或`A`,`B`,`C`，
一旦业务确定，不太可能出现`C->A->B`这样乱序的触发顺序。

所以Store使用数组管理所有的[中间件](#middleware)，当一个行为发生的，依次通知这些中间件，
所有中间件处理完成后，得到最终结果。

同样处理上面的问题，Store的代码大致如下：
```js
import { Store, storeValidatorCreator, Vlidator, DateType, DateTypes, Required } from 'strore'

// define user model
class User extends Validator {
   @DateType(DateTypes.PRIM_STR)
   @Required()
   id = null

   @DateType(DateTypes.PRIM_STR)
   @Required()
   group_id = null
}
const Action = { fetch_user: 'FETCH_USER', fetch_group: 'FETCH_GROUP' }
const scheduler_user = function(action, model, done){
  if(action.type === Action.fetch_user){
    fetch(`/api/user/${action.payload}/info').then(user => {
      model.set(user)
      done()
    })
  }
}

// define group model
class Group extends Validator {
  @DateType(DateTypes.PRIM_STR)
  @Required()
  id = null
}
const scheduler_group = function(action, model, done){
  if(action.type === Action.fetch_group){
    fetch(`/api/group/${action.payload}/info').then(user => {
      model.set(user)
      done()
    )
  }
}

// create store
const store = new Store()
// 注意：首先创建User
storeValidatorCreator({
  namespace: 'User',
  model: new User(),
  scheduler: scheduler_user,
  map: model => ({id: model.id, group_id: model.group_id})
}, store)
// 然后创建Group
storeValidatorCreator({
  namespace: 'Group',
  model: new Group(),
  scheduler: scheduler_group,
  map: model => ({id: model.id})
}, store)

// 建立完成后，派发action
store.dispatch(
 {type: Action.fetch_usr, payload: 'user_record_id'},
 state => store.dispatch({type: Action.fetch_group, payload: state.User.group_id})
)
```

# APIS
TODO

# Middleware
TODO

# Examples
TODO

# English Docs
TODO