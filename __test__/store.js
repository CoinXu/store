/**
 * Created on 01/05/2017.
 */

import { Store } from '../src'
import { equal } from 'assert'

describe('Store class', function () {
  
  const mw1 = function (action, state, next) {
    setTimeout(function () {
      next({ count: (state.count || 0) + 1 })
    }, 200)
  }
  
  const mw2 = function (action, state, next) {
    next({ count: state.count + 1 })
  }
  
  const mw3 = function (action, state, next) {
    setTimeout(function () {
      next({ count: state.count + 1 })
    }, 200)
  }
  
  it('Store.subscribe will called after Store.dispatch invoke', function (done) {
    const store = new Store()
    store.subscribe(function () {
      done()
    })
    store.dispatch({ type: 'any' })
  })
  
  it('Use middleware through store.use', function (done) {
    const store = new Store()
    let used = false
    
    store.use(function (action, state, next) {
      used = true
      next({})
    })
    
    store.subscribe(function (state) {
      done(equal(used, true))
    })
    
    store.dispatch({ type: 'any' })
  })
  
  it('All middleware will be invoke when initialize method called', function (done) {
    const store = new Store()
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
    const store = new Store()
    store.use(mw1)
    store.use(mw2)
    store.use(mw3)
    
    store.subscribe(function (state) {
      equal(state.count, 3)
      done()
    })
    store.dispatch({ type: '' })
  })
  
})

