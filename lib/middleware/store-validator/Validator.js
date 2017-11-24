'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Author sugo.io<asd>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date 17-10-20
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _valid = require('../../decorate/validator/valid');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object<string, Array<string>>} ValidMessage
 */

var Validator = function () {
  function Validator() {
    _classCallCheck(this, Validator);

    this.__message__ = {};
    this.__validator__ = this.validator();
  }

  /**
   * @return {Object<string, Array<ValidatorBuffer>>}
   */


  _createClass(Validator, [{
    key: 'validator',
    value: function validator() {
      var validators = {};

      var proto = this.__proto__;
      var valid = void 0;

      while (proto) {
        valid = _valid.ValidatorDefaultBuffer.get(proto);
        if (valid !== null) {
          Object.assign(validators, valid.validator);
        }
        proto = proto.__proto__;
      }

      return validators;
    }

    /**
     * @return {?Object<string, Array<string>>}
     */

  }, {
    key: 'getValid',
    value: function getValid() {
      var result = {};
      var message = this.__message__;

      var has = void 0;
      var propKey = void 0;

      for (propKey in message) {
        if (!_valid.hasOwnProperty.call(message, propKey) || message[propKey] === null) continue;
        has = true;
        result[propKey] = message[propKey];
      }

      return has ? result : null;
    }

    /**
     * @param {Object} values
     * @return {?Object<string, Array<string>>}
     */

  }, {
    key: 'valid',
    value: function valid(values) {
      var validator = this.__validator__;
      var message = this.__message__;

      var propKey = void 0;
      var valid = void 0;
      var fault = void 0;
      var arr = void 0;

      for (propKey in values) {
        if (!_valid.hasOwnProperty.call(values, propKey) || !_valid.hasOwnProperty.call(validator, propKey)) continue;

        valid = validator[propKey];
        arr = [];
        fault = valid.some(function (vb) {
          if (vb.validator(values[propKey])) {
            return false;
          }
          arr.push((0, _valid.template)(vb.msg, { key: propKey }));
          return true;
        });

        message[propKey] = fault ? arr : null;
      }

      return this.getValid();
    }

    /**
     * 更新数据
     * @param {Object|string} valuesOrKey
     * @param {*} [valueOrUndef]
     * @return {Validator}
     */

  }, {
    key: 'set',
    value: function set(valuesOrKey, valueOrUndef) {
      var values = arguments.length === 2 ? _defineProperty({}, valuesOrKey, valueOrUndef) : valuesOrKey;
      var validate = this.valid(values);

      for (var propKey in values) {
        if (!_valid.hasOwnProperty.call(values, propKey)) continue;
        if (validate && _valid.hasOwnProperty.call(validate, propKey)) continue;
        this[propKey] = values[propKey];
      }

      return this;
    }

    /**
     * @param {*} ins
     * @return {boolean}
     */

  }], [{
    key: 'isValidator',
    value: function isValidator(ins) {
      return ins instanceof Validator;
    }
  }]);

  return Validator;
}();

exports.Validator = Validator;