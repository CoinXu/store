# About
Store is a state manager write by JavaScript.

# Example
All in [__test__](https://github.com/CoinXu/store/tree/master/__test__) directory.

# API Reference

## Store
+ new(state = {}): this
+ initialize(action = DefAction): this
+ _dispose(action:Object, callback?:Function): this
+ single(action:Object, callback?:Function): this
+ multiple(actions:Array<Object>, callback?:Function): this
+ dispatch(actionOrActions:Object|Array<Object>, callback?:Function): this
+ use(mw:StoreMiddleware): this
+ getState(): Object
+ subscribe(observer:Function): this

## ModelDesc
ModelDesc is a object to define a store model include property below:

+ name: String
+ state: Object
+ scheduler: (state: Object, action: Object, next: Function) => any
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

## Model
+ new(desc:ModelDesc)
+ method receiver(action:Object, storeState:Object, next:Function): this
+ method done(state:Object, next:Function): this
+ static isModel(ins:any): Boolean
+ property name:String
+ property scheduler: ModelDesc.scheduler
+ property state: Object

## ViewModel
Extends from Model bug have a store property that is store instance.
You can use store's methods in ViewModel `scheduler` but not in Model.

+ property store: Store

## Middleware
+ storeModelCreator(Array<Model|ModelDesc>, store)
+ storeViewModelCreator(Array<ViewModel|ModelDesc>, store)

```js
import {Store, storeModelCreator, storeViewModelCreator} from 'store'
const store = new Store()
storeModelCreator(UserModelDesc, store)
storeViewModelCreator(UserModelDesc, store)
```

# LICENSE
[MIT](https://opensource.org/licenses/MIT)
