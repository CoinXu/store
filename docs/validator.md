## Validator 验证器

随着Store在项目中使用范围增加，我们发现原有[Model](./model.md)的设计使用起来还
差了一点东西，那就是输入验证。

一般的工作流程是将验证放在view或ViewModel层，之后再赋值给Model。从功能实现上来说，这没有什么问题。我们从工程角度思考之后，觉得验证就应该放在Model，即使是在前端，也应该放在Model。

在Model验证实现了验证功能随着Model一起，变得可复用与可维护。
视图层只管往Model层写入，如果Model层验证失败，则返回错误信息，视图层收到信息后进行处理。

使用Validator定义Model，在前端，可以一次定义，两处使用：
+ 用户输入处
+ 接口请求处

如果你的服务器由nodejs书写，你可以再增加两处使用：
+ 接口层验证
+ 数据库入库前验证

所以，Store推荐使用Validator代替原有的[Model](./model.md)，
或者在后面的版本，会删除原有Model，使用Validator重新实现Model。

## 定义
Validator使用es7装饰器特性定义，所以你需要搭建es7转es3、es5或es6的编译环境。

下面是一个简单的示例：
```ts
import {Validator, Validates} from "store"
const {DateType, DateTypes, Required, Pattern, Range} = Validates

interface UserModel {
  id: string
  name?: string
}

class User extends Validator<UserModel> {
  @DateType(DataTypes.PRIM_S)
  @Required()
  id: string = null

  @Pattern(/[a-zA-Z]{2,32}/, "name只能为字母，长度为2~32位")
  @DateType(DataTypes.PRIM_S)
  name: string = null
}

const user = new User()
user.validOne("name", "a")  // name只能为字母，长度为2~32位
user.validOne("name", "aa") // null
```

## 继承
Validator中验证器可以被继承
```ts
interface VipUserModel extends UserModel {
  level: number
}
class VipUser extends User {
  @Range(0, 10)
  @Required()
  level: number = null
}

// 向上转型为Validator
const vipUser: Validator<VipUser> = new VipUser()
user.validOne("name", "a")  // name只能为字母，长度为2~32位
user.valid({level: 11})     // {level: Must be of type number that greater than 0 less than 10}
```

## 在Store中使用
与[Model](./model.md)类似，使用一个描述对象定义Validator，使用`storeValidatorCreator`将描述对象与Store关联。

描述对象属性如下：
+ `namespace`   validator名称，将会成为Validator在`store.state`上的key
+ `model`       Validator实例
+ `scheduler`   Validator处理action的调度器，该属性用于与Store连接
+ `map`         调用后得到Validator传递到`store.state[namespace]`上的值

```ts
interface UserStore extends UserModel {
  message?: any
}

const store = new Store<{ User: UserStore }>()
storeValidatorCreator({
  namespace: 'User',
  model: new User(),
  scheduler(action: Action, model: User, done: Next<any>) {
    const { type, payload } = action
    switch (type) {
      case "upgrade":
        model.set(payload)
        done()
        break
      default:
        done()
    }
  },
  map(model: User) {
    return {
      name: model.name,
      message: model.getValid()
    }
  }
}, store)

store.subscribe(state => {
  console.log(state.User.name)     // A
  console.log(state.User.message)  // null
})
store.dispatch({ type: Action.upgrade, payload: { name: "A" } })
```

## Validator 类接口说明

+ `public constructor()`

+ `public validator(): {[key in keyof T]?: ValidatorDesc[]}`

  获取所有的验证器
  ```ts
  validator.validator() // {name: [function, function, ...]}
  ```

+ `public validOne(key: keyof T, value: any): string | null`

  验证单个key-value。如果一个key有多个验证器，会依次调用验证器，如果遇到验证失败，则不再继续验证。
  ```ts
  validator.validOne("name" , "")   // return string
  ```

+ `public valid(values: Partial<T>): { [key: string]: string } | null`

  验证多个key-value，返回错误消息的map
  ```ts
  validator.valid({name: "", id: ""}) // {name:string, id: string}
  ```

+ `public getValid(): {[key in keyof T]?: string} | null`

  获取缓存的错误信息
  ```ts
  validator.getValid()   // {name:string, id:string} or null
  ```

+ `public set(valuesOrKey: Partial<T> | keyof T, valueOrUndef?: keyof T | any)`

  赋值，调用验证器验证值，更新缓存的错误信息并返回验证信息
  ```ts
  validator.set("name", "A")   // null
  validator.set("name", "")    // {name: string}
  validator.set({name: ""})    // {name: string}
  ```

+ `static isValidator<T>(ins: any): ins is Validator<T>`

  验证传入参数是否为Validator实例。

## 目前可用验证器列表
+ `@DataType(type: DataTypes, msg?: string): ValidatorDecorate`

  数据类型验证
  ```ts
  // DataTypes可设类型
  export enum DataTypes {
    // Primitive
    PRIM_BOOL,
    PRIM_NUM,
    PRIM_STR,
    PRIM_NL,
    PRIM_UNDEF,
    PRIM_SYMBOL,

    // Object
    OBJ_O,
    OBJ_A
  }

  class D extends Validator<any> {
    @DataType(DataTypes.PRIM_NUM)
    id: string = null
    @DataType(DataTypes.OBJ_O)
    obj: any = null
    @DataType(DataTypes.NL)
    nl: null = null
  }
  ```

+ `@Enum(enumData: Object, msg?: string): ValidatorDecorate`

  枚举类型验证
  ```ts
  enum En { a, b }
  class D extends Validator<{ val: any }> {
    @Enum(En)
    val: En = null
  }
  ```

+ `@Pattern(reg: RegExp, msg?: string): ValidatorDecorate`

  模式匹配
  ```ts
  class D extends Validator<{ val: any }> {
    @Pattern(/\d/)
    val: string = null
  }
  ```

+ `@Required(msg?:string): ValidatorDecorate`

  必填项

+ `@MaxLen(length: number, msg?: string): ValidatorDecorate`

  字符串最大长度

+ `@MinLen(length: number, msg?: string): ValidatorDecorate`

  字符串最小长度

+ `@RangeLen(min: number, max: number, msg?: string): ValidatorDecorate`

  字符串长度区间

+ `@Max(num: number, msg?: string): ValidatorDecorate`

  数值最大值

+ `@Mix(num: number, msg?: string): ValidatorDecorate`

  数值最小值

+ `@Range(min: number, max: number, msg?: string): ValidatorDecorate`

  数值区间