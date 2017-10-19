'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = undefined;

var _valid = require('./valid');

/**
 * 数值取值验证
 * @param {Array<number>} range
 * @param {string} [msg]
 * @param {string} [messageKey]
 * @return {ValidDecorate}
 */
function Range(range, msg, messageKey = 'message') {
  msg = msg || `{{key}}: Must be of type umber that greater than ${range[0]} less than ${range[1]} `;

  function validator(value) {
    return typeof value === 'number' && value >= range[0] && value <= range[1];
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Range;
exports.Range = Range;