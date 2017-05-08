'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Observable = function () {
  function Observable() {
    (0, _classCallCheck3.default)(this, Observable);

    this.observer = _utils.noop;
  }

  (0, _createClass3.default)(Observable, [{
    key: 'onNext',
    value: function onNext(data) {
      this.observer(data);
      return this;
    }
  }, {
    key: 'subscribe',
    value: function subscribe(observer) {
      (0, _utils.assert)((0, _utils.isFunction)(observer), 'observer must be a function');
      this.observer = observer;
      return this;
    }
  }]);
  return Observable;
}(); /**
      * Created on 28/04/2017.
      */

exports.default = Observable;