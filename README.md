[![Build Status](https://travis-ci.org/CoinXu/store.svg?branch=master)](https://travis-ci.org/CoinXu/store)
[![npm version](https://badge.fury.io/js/sugo-store.svg)](https://badge.fury.io/js/sugo-store)

# About
Store is a state manager write by JavaScript.

# Example
All in [__test__](https://github.com/CoinXu/store/tree/master/__test__) directory.

# Store
* new(state = {}): this
* initialize(action = DefAction): this
* _dispose(action:Object, callback?:Function): this
* single(action:Object, callback?:Function): this
* multiple(actions:Array<Object>, callback?:Function): this
* dispatch(actionOrActions:Object|Array<Object>, callback?:Function): this
  ```js
  // dispatch single action
  store.dispatch({type: 'TYPE_A'}, function(state){
    // do sth
  })
  // dispatch multiple actions
  store.dispatch([{type: 'ACTION_A'}, {type: 'ACTION_B'}], function(state) {
    // do sth
  })
  ```
* use(mw:[StoreMiddleware](#storemiddleware)): this
* getState(): Object
* subscribe(observer:Function): this
`Store` is base class only use by new operate.

# StoreMiddleware
Store middleware must be a function which receive three params.

* action: Object
* storeState: Object
* next: (Object) => any

# ModelDesc
ModelDesc is a object to define a store model include property below:

* name: String
* state: Object
* scheduler: (state: Object, action: Object, next: Function) => any

```js
const UserModelDesc = {
  name: 'User',
  scheduer: function(state, action, next){
    switch(action.type){
      case 'update_user_name':
        done({name: action.payload.name})
        break
      default:
        next(state)
    }
  },
  state: {
    name: 'coin',
    city: 'Guangzhou'
  }
}
```

# Model

* new(desc:[ModelDesc](#modeldesc))
* method receiver(action:Object, storeState:Object, next:Function): this
* method done(state:Object, next:Function): this
* static isModel(ins:any): Boolean
* property name:String
* property scheduler: ModelDesc.scheduler
* property state: Object

# ViewModel
Extends from Model and have a store property that a store instance.
You can use store's methods in ViewModel `scheduler` but not in Model.

* property store: [Store](#store)

# Middleware

* storeModelCreator(Array<[Model](#model)|[ModelDesc](#modeldesc)>, store)
* storeViewModelCreator(Array<[ViewModel](#viewmodel)|[ModelDesc](#modeldesc)>, store)

```js
import {Store, storeModelCreator, storeViewModelCreator} from 'store'
const store = new Store()
storeModelCreator(UserModelDesc, store)
storeViewModelCreator(UserModelDesc, store)
```

# Test
```bash
npm run test
```

# LICENSE
[MIT](https://opensource.org/licenses/MIT)
