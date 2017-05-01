# 跑demo
```bash
 yarn install
 # 或
 npm install
 # 后
 npm run webpack
 # 之后在浏览器中打开 /test/test.html
```

# 初始版本，啥都没有定，不要使用，上传只是为了代码备份

# 主要目的
1. 强制分离view与model
2. model可复用，model与viewModel分离

# 基本架构
```bash
User <-> View <-> Store <-> Model 
```
请注意，`View`跟`Model`没有直接关联


# 需求
+ [x] 管理多个`model`
+ [ ] 各`model`间可建立通信管道 :pensive:
+ [x] 使用行为(action)触发更新
+ [x] 更新时通知所有的`model`
+ [x] immutable data
+ [x] 异步支持
+ [x] 可观察
+ [x] 插件或中间件支持

# Store
核心`store`只是一个调度器，其他功能以`middleware`的形式完成，`store`包含的方法如下
+ use(mw) 添加middleware，执行顺序按添加顺序
+ dispatch(action) 派发命令
+ initialize([action]) 初始化时会发出一个初始化的action，各个middleware可以根据情况处理

# Model
一个`model`采用以下属性描述
+ name      命名空间，以便识别
+ state     状态
+ actions   行为
+ scheduler 接收到action时的调度器

当接收到`action`时，调用`scheduler`，其中由用户定义行为。
可以在其中调用`actions`。

`model`所有`actions`均会被代理，代理函数中会传入两个参数：
+ state   当前`state`
+ done    处理完`action`时调用该方法，通知观察者

# Middleware
一个`middleware`为一个函数，其参数如下：
+ action   当前触发的行为
+ state    当前`store`中的状态
+ next(result)     执行完成时，传入结果到该方法，该方法必须被调用

# Middleware List
+ store-model
  管理多个`model`
  
# LICENSE
[MIT](https://opensource.org/licenses/MIT)  
 