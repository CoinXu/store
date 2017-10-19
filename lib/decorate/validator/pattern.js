'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pattern = undefined;

var _valid = require('./valid');

/**
 * 正则匹配
 * @param {RegExp} pattern
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function Pattern(pattern, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Not Matched Error`;

  function validator(value) {
    return pattern.test(value);
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Pattern;
exports.Pattern = Pattern;