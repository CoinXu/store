/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   25/11/2017
 * @description
 */

import "mocha"
import { Store } from "../src"
import { equal } from "assert"
import { Action, Next, Middleware } from "../src/interfaces"

describe('Store class', function () {
  interface TestState {
    count: number
  }

  const mw1: Middleware<TestState> = function (action: Action, state: TestState, next: Next<TestState>) {
    setTimeout(function () {
      next({ count: state.count + 1 })
    }, 200)
  }

  const mw2: Middleware<TestState> = function (action: Action, state: TestState, next: Next<TestState>) {
    next({ count: state.count + 1 })
  }

  const mw3: Middleware<TestState> = function (action: Action, state: TestState, next: Next<TestState>) {
    setTimeout(function () {
      next({ count: state.count + 1 })
    }, 200)
  }

  it('Store.subscribe will called after Store.dispatch invoke', function (done) {
    const store = new Store<TestState>({ count: 0 })
    store.subscribe(function () {
      done()
    })
    store.dispatch({ type: 'any' })
  })

  it('Store.dispatch can access callback', function (done) {
    const store = new Store<TestState>({ count: 0 })
    store.use(mw1)
    store.use(mw2)
    store.use(mw3)

    store.dispatch({ type: '' }, function (state: TestState) {
      equal(state.count, 3)
      done()
    })
  })

  it('Use middleware through store.use', function (done) {
    const store = new Store<TestState>({ count: 0 })
    let used = false

    store.use(function (action, state, next) {
      used = true
      next({})
    })

    store.subscribe(function (state) {
      equal(used, true)
      done()
    })

    store.dispatch({ type: 'any' })
  })

  it('All middleware will be invoke when initialize method called', function (done) {
    const store = new Store<TestState>({ count: 0 })
    store.use(mw1)
    store.use(mw2)
    store.use(mw3)

    store.subscribe(function (state) {
      equal(state.count, 3)
      done()
    })
    store.initialize()
  })

  it('All middleware will be invoke when dispatch method called', function (done) {
    const store = new Store<TestState>({ count: 0 })
    store.use(mw1)
    store.use(mw2)
    store.use(mw3)

    store.subscribe(function (state) {
      equal(state.count, 3)
      done()
    })
    store.dispatch({ type: '' })
  })

  it('dispatch multi actions', function (done) {
    const store = new Store<TestState>({ count: 0 })

    const actions = {
      first: 'f',
      second: 's',
      third: 't'
    }

    store.use(function (action, state, next) {
      switch (action.type) {
        case actions.first:
          return setTimeout(function () { next({ count: state.count + 1 }) }, 100)
        default:
          return next({})
      }
    })

    store.use(function (action, state, next) {
      switch (action.type) {
        case actions.second:
          return setTimeout(function () { next({ count: state.count + 1 }) }, 100)
        default:
          return next({})
      }
    })

    store.use(function (action, state, next) {
      switch (action.type) {
        case actions.third:
          return setTimeout(function () { next({ count: state.count + 1 }) }, 100)
        default:
          return next({})
      }
    })

    store.subscribe(state => {
      equal(state.count, 3)
      done()
    })

    store.dispatch([
      { type: actions.first },
      { type: actions.second },
      { type: actions.third }
    ])
  })
})  