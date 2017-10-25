'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeLen = undefined;

var _valid = require('./valid');

/**
 * 字符长度取值区间验证
 * @param {number} min
 * @param {number} max
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function RangeLen(min, max, msg) {
  msg = msg || `{{key}}: Must be of type String than length greater than ${min} less than ${max}`;

  function validator(value) {
    return typeof value === 'string' && value.length >= min && value.length <= max;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = RangeLen;
exports.RangeLen = RangeLen;