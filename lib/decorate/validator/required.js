'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Required = undefined;

var _valid = require('./valid');

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Required(msg = '{{key}} is required') {
  function validator(value) {
    return value !== void 0 && value !== '';
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Required;
exports.Required = Required;