## ViewModel 实图层数据管理核心

ViewModel与[Model](./model.md)唯一的区别就在于ViewModel需要与具体的[Store](./store.md)相关联。
而Model是绝对独立的，可以与任意的Store关联。之所以将单独拆分一个ViewModel，就是为了强制ViewModel与Model分离，
从而提高Model的可维护性。

在此处强调一下: **Store库存在的目标就是管理好Model**

从业务层面来说，ViewModel的可复用性远远低于Model，甚至是不可复用的，当然，可复用的组件的ViewModel不在此处讨论。

ViewModel与用户界面打交道，所以必须要有操作当前store的能力。比如用户输入错误时，需要发送一个message的action。
所以ViewModel设计时，将当前的store挂载到实例上，可以在`scheduler`函数中通过`this.store`取得当前的store实例。

## 定义ViewModel
与定义Model几乎一样。
```ts
// model-user.ts
export interface UserModel {
  id: string
  name: string
  age: number
}
// view-model.ts
export interface UserList {
  users: <UserModel>[]
}
const Def: UserList = {
  users: []
}
export default <ViewModelDescription<UserList>> {
  name: 'vm',
  state: { ...Def },
  scheduler: function(action: Action, state: UserList, next: Next<UserList>) {
    if(action.type === "some action type") {
      // 此处可以拿到store，而Model则不可以，注意此处的区别
      this.store.dispatch({type: "other action"})
      next()
    }
  }
}
```

## 在Store中使用
ViewModel定义应该独立存在于一个JavaScript模块中，在业务模块中引用。
使用`storeViewModelCreator`函数关联ViewModel与Store，函数定义如下:
```ts
function storeViewModelCreator<T, U>(
  mods: Array<ViewModelDescription<T> | ViewModel<T>>,
  store: Store<U>
): Store<U>
```
