'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

/**
 * 按顺序执行一个数组中的函数。
 * 每个函数执行是传入三个参数：
 * + action
 * + state
 * + next
 * @param {Array<Function>} array
 * @return {Function}
 */
function compose(array) {
  (0, _utils.assert)((0, _utils.isArray)(array), 'To composed must be an Array');
  array.forEach(function (fn) {
    (0, _utils.assert)((0, _utils.isFunction)(fn), 'Each item must be a function');
  });

  return function (action, state, processor, complete) {
    var index = -1;
    dispatch(0);

    function dispatch(i) {
      (0, _utils.assert)(i > index, 'next() called multiple times');
      index = i;
      if (i === array.length) return complete(action);
      array[i](action, state, function (result) {
        processor(result);
        return dispatch(i + 1);
      });
    }
  };
} /**
   * Created on 29/04/2017.
   */

exports.default = compose;