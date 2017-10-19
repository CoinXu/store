'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Max = undefined;

var _valid = require('./valid');

/**
 * 右边界验证
 * @param {number} num
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function Max(num, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Must be of type umber and less than ${num}`;

  function validator(value) {
    return typeof value === 'number' && value <= num;
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Max;
exports.Max = Max;