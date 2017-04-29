/**
 * Created on 29/04/2017.
 */

import { isArray, isFunction, assert } from './utils'

function compose (array) {
  assert(isArray(array), 'To composed must be an Array')
  array.forEach(function (fn) {
    assert(isFunction(fn), 'Each item must be a function')
  })
  
  return function (action, store, processor, complete) {
    let index = -1
    dispatch(0)
    
    function dispatch (i) {
      assert(i > index, 'next() called multiple times')
      index = i
      if (i === array.length) return complete(action)
      array[i](action, store, function (result) {
        processor(result)
        return dispatch(i + 1)
      })
    }
  }
}

export default compose
