'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeLen = undefined;

var _valid = require('./valid');

/**
 * 字符长度取值区间验证
 * @param {Array<number>} range
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function RangeLen(range, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Must be of type String than length greater than ${range[0]} less than ${range[1]} `;

  function validator(value) {
    return typeof value === 'string' && value.length >= range[0] && value.length <= range[1];
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = RangeLen;
exports.RangeLen = RangeLen;