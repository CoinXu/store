'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @param {string} temp
 * @param {Object} values
 * @return {string}
 * @example
 * ```js
 * template('{{key}} is {{value}}', {key:'k', value: 'v'}) // k is v
 * ```
 */
function template(temp, values) {
  for (var propKey in values) {
    if (!hasOwnProperty.call(values, propKey)) continue;
    temp = temp.replace(new RegExp('{{' + propKey + '}}', 'g'), values[propKey]);
  }
  return temp;
}

/**
 * @typedef {Object} ValidatorBuffer
 * @property {string} msg
 * @property {ValidatorDesc} validator
 */

/**
 * @typedef {Object} TargetValidator
 * @property {Object} target
 * @property {Object<string, Array<ValidatorBuffer>>} validator
 */

/**
 * @class 缓存验证器
 */

var ValidatorBuffer = function () {
  function ValidatorBuffer() {
    _classCallCheck(this, ValidatorBuffer);

    /** @type {Array<TargetValidator>} */
    this.buffer = [];
  }

  /**
   * @param {Object} target
   * @param {string} key
   * @param {ValidatorDesc} validator
   * @param {string} msg
   * @return {ValidatorBuffer}
   */


  _createClass(ValidatorBuffer, [{
    key: 'add',
    value: function add(target, key, validator, msg) {
      var buf = this.buffer.find(function (buf) {
        return buf.target === target;
      });

      if (buf) {
        var arr = buf.validator[key] || (buf.validator[key] = []);
        arr.push({ msg: msg, validator: validator });
        return this;
      }

      this.buffer.push({
        target: target,
        validator: _defineProperty({}, key, [{ msg: msg, validator: validator }])
      });

      return this;
    }

    /**
     * @param {Object} target
     * @return {Object<string, Array<ValidatorBuffer>>|null}
     */

  }, {
    key: 'get',
    value: function get(target) {
      return this.buffer.find(function (buf) {
        return buf.target === target;
      }) || null;
    }

    /**
     * @param {Object} target
     * @return {ValidatorBuffer}
     */

  }, {
    key: 'destroy',
    value: function destroy(target) {
      this.buffer = this.buffer.filter(function (buf) {
        return buf.target !== target;
      });
      return this;
    }
  }]);

  return ValidatorBuffer;
}();

/**
 * @type {ValidatorBuffer}
 */


var ValidatorDefaultBuffer = new ValidatorBuffer();

/**
 * @typedef {function} ValidDecorate
 * @param {*} target
 * @param {string} key
 * @param {object} descriptor
 * @return {object}
 */

/**
 * @typedef {function} ValidatorDesc
 * @param {*} value
 * @return {boolean}
 */

/**
 * @param {ValidatorDesc} validator
 * @param {string} msg
 * @return {ValidDecorate}
 */
function decorate(validator, msg) {
  /**
   * 如果value为初始值,直接返回true
   * 使用null标识初始值
   * @param {*} value
   * @return {boolean}
   */
  function wrapper(value) {
    return value === null || validator(value);
  }

  return function (target, key, descriptor) {
    ValidatorDefaultBuffer.add(target, key, wrapper, msg);
    return descriptor;
  };
}

exports.ValidatorDefaultBuffer = ValidatorDefaultBuffer;
exports.hasOwnProperty = hasOwnProperty;
exports.decorate = decorate;
exports.template = template;