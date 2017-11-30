## Store 流程控制基类
Store提供了流程控制最核心的部份：中间件调用、派发行为、组合结果及注册观察者。

Store使用私有state对象来管理所有状态，state对象的变化是由依附在Store上的中间件完成的。
当一个action派发时，Store会依次调用每个中间件，传入action、state及next参数。

**注**
1. Store建议每个action都使用唯一的type属性来标识，尽管这不是必需的。
2. 为了兼容大部份浏览器及更轻量，Store被设计为以callback的方式来控制流程，而没有使用更适合的Promise方案。

## 中间件
中间件为Store的最重要的部份，也是大量业务代码书写之处。
每一个中间在完成时，需要调用传入的next参数，否则不会继续执行下一个中间件。
在next调用中传入的值，将会作为该中间件的结果，合并到Store的state对象上，共享给其他中间件。
所以Store中间件定义为：
```ts
export interface Middleware<T> {
  (action: Action, state: T, next: Next<T>): void
}
```
Store调用中间件是有序的，并且是同步的。只有当上一个中间件调用了传入的next参数时，才会执行下一个中间件。
所以，无论如何，在你的中间件中都应该调用并且只调用一次next参数。一个简单的中间件定义：
```ts
function(action: Action, state: any, next: Next<any>) {
  if( action.type === "one action type") {
    // do something then call next method
    next({ props: "value" })
  }
}
```

## 方法
+ `public constructor(state: T = {} as T)`
```ts
import { Store } from "store"
interface State {
  num: number
}
let store: Store<State>
store = new Store<State>({num: 0})
store = new Store<State>()
```
构造器,初始state参数为可选

+ `public initialize(action: Action = DefAction): Store<T>`
```ts
store.initialize()
store.initialize({type: 'defined by user'})
```
初始化函数调用时,使用默认的或用户传入的action,将所有的中间件执行一次,得到state的初始值.

+ `public dispatch(actionOrActions: Action | Action[], callback?: Observer<T>): Store<T>`
```ts
store.dispatch({type: 'action type'}, console.log)
store.dispatch([{type: 'action a'}, {type: 'action b'}])
```
派发action对外统一接口.dispatch函数只是判断传入的action是单个还是多个,
调用的依然是`store.signle`或`store.multiple`.

+ `protected single(action: Action, callback: Observer<T>): Store<T>`
```ts
store.single({type: 'action type'}, console.log)
```
派发单个action

+ `protected multiple(actions: Action[], callback?: Observer<T>): Store<T>`
```ts
store.multiple([{type: 'action a'}, {type: 'action b'}], console.log)
```
派发多个action

+ `public use(mw: Middleware<T>): Store<T>`
```ts
store.use(function(action, state, next){
  if( action.type === 'action type' ) {
    next({num: state.num + 1})
  }
})
```
添加中间件

+ 获取当前state: `public getState(): T`
```ts
const state: T = store.getState()
console.log(state.num)
```

+ `public subscribe(observer: Observer<T>): Store<T>`
```ts
store.subscribe(state => console.log(state))
```
注册观察者.一个store只能注册一个观察者,后注册的覆盖之前注册的.
