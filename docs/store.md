## Store 流程控制基类
Store提供了流程控制最核心的部份：中间件调用、派发行为、组合结果及注册观察者。

Store使用私有state对象来管理所有状态，state对象的变化是由依附在Store上的中间件完成的。
当一个action派发时，Store会依次调用每个中间件，传入action、state及next参数。

### 注
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
