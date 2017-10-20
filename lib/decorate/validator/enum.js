'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enum = undefined;

var _valid = require('./valid');

/**
 * @param {Object} enumData
 * @param {string} [msg]
 * @param {string} [messageKey = 'message']
 * @return {ValidDecorate}
 */
function Enum(enumData, msg, messageKey = 'message') {
  const values = Object.keys(enumData).map(key => enumData[key]);
  msg = msg || `Enum Type Error: {{key}} Must be one of ${values.join('')}`;

  function validator(value) {
    return values.includes(value);
  }

  return (0, _valid.decorate)(validator, msg, messageKey);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Enum;
exports.Enum = Enum;