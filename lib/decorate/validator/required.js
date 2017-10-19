'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Required = undefined;

var _valid = require('./valid');

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @param {string} [messageKey = 'message']
 * @return {ValidDecorate}
 */
function Required(msg = '{{key}} is required', messageKey = 'message') {
  function validator(value) {
    return value !== void 0 && value !== '';
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Required;
exports.Required = Required;