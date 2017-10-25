'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = undefined;

var _valid = require('./valid');

/**
 * 数值取值验证
 * @param {number} min
 * @param {number} max
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Range(min, max, msg) {
  msg = msg || `{{key}}: Must be of type number that greater than ${min} less than ${max} `;

  function validator(value) {
    return typeof value === 'number' && value >= min && value <= max;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Range;
exports.Range = Range;