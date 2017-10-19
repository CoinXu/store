'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Min = undefined;

var _valid = require('./valid');

/**
 * 左边界验证
 * @param {number} num
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function Min(num, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Must be of type umber and greater than ${num}`;

  function validator(value) {
    return typeof value === 'number' && value >= num;
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Min;
exports.Min = Min;