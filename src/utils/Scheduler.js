/**
 * Created by asd on 17-8-4.
 * @description 异步任务调度器
 * 1. 注册任务函数
 * 2. 压入任务参数
 * 3. 由该调度器决定何时调用回调函数
 *
 *  @example
 * ```js
 * const scheduler = new Scheduler()
 *
 * scheduler.push(() => console.log(1))
 * scheduler.push(() => console.log(2))
 * ``
 */

import { assert, isFunction } from './utils'

class Scheduler {
  /**
   * 初始化时可以传入subscriber
   */
  constructor () {
    this.tasks = []
  }

  /**
   * 压入回调
   * @param {Function} callback
   * @return {Scheduler}
   */
  push (callback) {
    assert(isFunction(callback), 'Callback must be a function in for Scheduler')
    this.tasks.push(callback)
    this.queue()
    return this
  }

  /**
   * 异步队列
   * @return {Scheduler}
   */
  queue () {
    if (this.tasks.length === 0) {
      return this
    }

    const callback = this.tasks.shift()

    setTimeout(() => {
      try {
        callback()
      } catch (e) {
        // TODO 考虑如何处理message
      }
    }, 0)

    return this
  }
}

export {
  Scheduler
}
