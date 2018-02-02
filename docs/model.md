## Model 数据管理核心
> 在大的业务系统下，Model管理不慎极可能出现灾难性的后果。而前端对Model的管理手段一般比较低级，
  大部份代码可能只抽离了一份接口路由文件，之后就是随便调用了，并没有思考Model更重要的处理。
  包括不限于：与接口的关联与解耦、接口异常处理、接口返回值结构是否统一、写入验证(包括用户输入、接口参数、入库这三处验证)。

__Store库存在的目标之一就是管理好Model__

以下是Store对Model管理的一些实践与总结，也许并不具有普适性，权作探讨。

1. Model管理来自接口层的数据，一般而言与服务器表或者业务模块一一对应。
2. Model粒度在业务层面做到最小，以便在使用时随意组合使用。

之所以将Model单独定义，是因为大多数业务下，Model都是可以复用的。
比如一个业务系统下的用户模块，涉及到用户相关的操作，可以定义为一个Model。Model定义后基本不会改变，除非业务本身发生了变化。

一个Model由三个基本属性构成:
+ `name`       model名称，比如:User，Order等， name将会成为Model在`Store.state`上的key
+ `state`      model初始属性，比如`{id: null, name: null, age: null}`
+ `scheduler`  model处理action的调度器，该属性用于与Store连接

## 定义Model
一个简单的Model定义:
```ts
// model-user.ts
export interface UserModel {
  id: string
  name: string
  age: number
}
export default <ModelDescription<UserModel>> {
  name: 'User',
  state: {id: null, name: null, age: null},
  scheduler: function(action: Action, state: UserModel, next: NextCallback<any>) {
    if(action.type === "some action type") {
      // do sth...
      next()
    }
  }
}
```
## 在Store使用
Model定义应该独立存在于一个JavaScript模块中，在业务模块中引用。
Store一般存在于业务模块中，根据不同的业务模块实现不同的流程。
换言之，Model是固定的，而Store是灵活的。
一个Model可以在不同的Store中使用，而一个Store定义好之后，一般用于某一固定业务模块。

使用`storeModelCreator`函数关联Model与Store，函数定义如下:
```ts
storeModelCreator<T>(
  mods: Array<Model<T> | ModelDescription<T>>,
  store: Store<any>
): Store<any>
```
`storeModelCreator`接收两个参数，`mods`与`store`，两个参数都是必须的。
其中`mods`为`Model`实例数组或`ModelDescription`数组。

定义Model推荐使用`ModelDescription`的方式，在`storeModelCreator`会自动创建一个新的Model实例。

假设在用户中心模块需要使用UserModel:
```ts
import {Store, storeModelCreator} from "sugo-store"
import User, {UserModel} from "./model-user.ts"

class UserCenter extends Store<{User: UserModel}> {
  constructor() {
    supper()
    storeModelCreator<UserModel>([User], this)
  }

  doSome() {
    const state = this.state
    // 此处可以直接使用User
    // 挂载在state上的key为User.name: "User"
    console.log(state.User.age)
  }
}
const userCenter = new UserCenter()
```
此时，`User`成为`userCenter`的一个中间件，
可以通过`userCenter.dispatch`来调度User在scheduler函数中定义的逻辑。

## Model的粒度控制
一般而言，Model的action与服务端接口一一对应即可。这样即保证了最小粒度，也保证了可维护性。
以UserModel为例，在实际业务中定义大致如下:
```ts
// model-user.ts
export interface User {
  id: string
  name: string
  age: number
}

const namespace = "namespace-model-user"

// 定义的action与服务端接口一一对应
export Actions = {
  Create: `${namespace}-create`,
  Destroy: `${namespace}-destroy`,
  Query: `${namespace}-query`
}
export default <ModelDescription<UserModel>> {
  name: 'User',
  state: {id: null, name: null, age: null},
  scheduler: function(action: Action, state: UserModel, next: NextCallback<any>) {
    const {type, payload} = action
    switch(type) {
      case Actions.Create:
        doCreate(state, payload).then(result => next(result))
        break
      case Actions.Destroy:
        doDestroy(state, payload, next)
        break
      default:
        next()
    }
  }
}
```

此后，在不同的业务模块中就可以使用上面定义的Model来处理。
```ts
// a.ts
import {Store, storeModelCreator} from "sugo-store"
import {Actions, User}, UserModel from "./model-user.ts"
class A extends Store<{User: User}> {
  constructor() {
    supper()
    storeModelCreator<User>([UserModel], this)
  }
  createUser(name, age) {
    this.dispatch({
      type: Actions.Create,
      payload: { name, age }
    }, state => console.log(state.User))
  }
}

// b.ts
import {Store, storeModelCreator} from "sugo-store"
import {Actions, User}, UserModel from "./model-user.ts"
class A extends Store<{User: User}> {
  constructor() {
    supper()
    storeModelCreator<User>([UserModel], this)
  }
  destroyUser(id) {
    this.dispatch({
      type: Actions.Destory
      payload: { id }
    }, state => console.log(state.User))
  }
}
```

## TODO
+ 更详细的示例
+ 前端管理Model更详细的讨论与实践
+ Model与接品的关联与解耦
