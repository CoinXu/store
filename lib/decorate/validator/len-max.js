'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxLen = undefined;

var _valid = require('./valid');

/**
 * 字符最大长度验证
 * @param {number} length
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function MaxLen(length, msg) {
  msg = msg || `{{key}}: Must be of type String that length less than ${length}`;

  function validator(value) {
    return typeof value === 'string' && value.length <= length;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = MaxLen;
exports.MaxLen = MaxLen;