## 集合
对于JavaScript来说，`Array`构造函数基本能完成大部份对集合的操作了。
但如果涉及到与服务端通信，用`Array`维护集合就显得有些力不从心了。

比如一个编辑用户列表的业务，步骤如下：
1. 从服务器获取已有的列一，记为L
2. 新添加一些用户，记为R
3. 修改原有的用户信息，记为U
4. 删除原有的用户信息，记为D

编辑完成后，调用服务端接口同步变动。如果服务端接口设计为接收一个集合，自动对比原有记录，用`Array`来处理就够了。但从节省服务器运算能力方面来说，这样的接口不宜过多，该类计算完全可以由客户端来分担。
客户端可以直接传给服务端类似下面的参数：
```json
{
  "Delete": [{"id": "id-1"}],
  "Create": [{"name": "name-1"}, {"name": "name-2"}],
  "Update": [{"id": "id-2", "name": "name-2-new"}]
}
```
服务端处理这样的数据将会非常方便与快速，由于数据结构清晰，日志也会非常易读。

## 定义集合
集合使用`CollectionDesc`接口声明，相关接口如下：
```ts
// collection默认对Store开放集合中所有的数据
// 挂载在名为list的key上
 type CollectionState<T, U = any> = { list: T[] } & U;

// 集合调度器，运行作用域为Store，可以在scheduler中通过`this`获取到store实例
export interface CollectionScheduler<T> {
  (
    this: Store<any>,
    action: Action,
    colect: Collection<T>,
    next: (props?: Partial<CollectionState<T>>) => any
  ): any
}
export interface CollectionDesc<T> {
  name: string
  primaryKey: keyof T
  scheduler: CollectionScheduler<T>
}
```
一个集合由三个基本属性构成：
+ `name`       集合名称，name将会成为集合在`store.state`上的key
+ `primaryKey` 指定主键，每条集合中的数据都必须有一个唯一主键
+ `scheduler`  调度器，用于与Store连接

## 示例

1. 定义Collection
   ```ts
   // user-collect.ts
   export interface User {
     id: string
     name: string
   }

   export default CollectionDesc<User> {
     name: "user",
     primaryKey: "id",
     scheduler: function (action, collection, next) {
       const { type, payload } = action
       switch (type) {
         case 'ADD':
           // 使用store
           this.dispatch({ type: '', payload: '' })
           collection.add(payload)
           next()
           break
         case 'REMOVE':
           collection.remove(payload.id)
           next()
           break
         default:
           next()
       }
     }
   }
   ```
2. 在Store中使用
   ```ts
   import {Store, storeCollectionCreator} from "sugo-store"
   import UserCollect, {User} from "./user-collect.ts"

   const store = new Store<{ user: CollectionState<User> }>()
   storeCollectionCreator(UserCollect, store)
   
   store.dispatch(
     { type: 'ADD', payload: { name: "A", id: "one" } },
     function (state) {
       console.log(state.user.list.length)   // 1
       console.log(state.user.list[0].name)  // A
     }
   )
   ```

## Collection类接口说明
+ `public constructor(primaryKey: keyof T, mods: T[] = [])`

  构造器
  ```ts
  new Collection<User>("id")
  new Collection<User>("id", [{id: "one", name: "A"}])
  ```

+ `public reset(mods: T[]): Collection<T>`

  重置所有属性，回到构造初始状态
  ```ts
  collect.reset([])
  ```

+ `public remove(keyOrMod: string | T): Collection<T>`

  删除记录，参数为primaryKey或记录本身
  ```ts
  // 删除id为one的记录
  collect.remove("one")
  // 删除所有name为A的记录
  collect.remove({name: "A"})
  ```

+ `public update(primaryValue: string, props: Partial<T>): Collection<T>`

  更新单条记录
  ```ts
  collect.update("one", {name: "AA"})
  ```

+ `public add(mod: T): Collection<T>`

  新增记录
  ```ts
  collect.add({id: "third", {name: "C"}})
  ```

+ `public sort(compare: (a: T, b: T) => number): Collection<T>`

  排序已存的记录
  ```ts
  collect.sort((a, b) => a.id > b.id ? -1 : 1)
  ```

+ `public at(index: number): T | null`

  通过索获取记录
  ```ts
  collect.at(1)
  ```

+ `public last(): T`

  获取最后一个记录
  ```ts
  collect.last()
  ```

+ `public find(filter: Partial<T>): T | null`

  查找记录
  ```ts
  collect.find({name: "A"})
  ```

+ `public get(): T[]`

  返回所有的记录
  ```ts
  collect.get()
  ```

+ `public toJSON(): CollectionJson<T>`

  返回collection当前结构化状态
  ```ts
  interface CollectionJson<T> {
    models: T[]     // 所有记录
    toDelete: T[]   // 相对于初始化时，已删除的记录
    toUpdate: T[]   // 需要更新的记录
    toCreate: T[]   // 需要创建的记录
  }
  collect.toJSON()
  ```

+ `public toString(): string`

