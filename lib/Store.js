'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utils = require('./utils/utils');

var _compose = require('./utils/compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefAction = { type: '__INITIALIZE__ACTION__' };

/**
 * @callback StoreMiddleware
 * @param {Object} action
 * @param {Object} state
 * @param {Function} next
 */

/**
 * @class
 * 该类提供状态管理的基本功能。
 * 扩展功能以中间件的方式实现。
 * 该类可观察。
 */

/**
 * Created on 28/04/2017.
 * @file 状态管理核心类
 */

var Store = function (_Observable) {
  (0, _inherits3.default)(Store, _Observable);

  function Store() {
    (0, _classCallCheck3.default)(this, Store);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.mw = [];
    _this.state = {};
    return _this;
  }

  /**
   * 初始化时，默认会发出一个初始化的action。
   * 当然用户也可指定。
   * @param {object} action
   */


  (0, _createClass3.default)(Store, [{
    key: 'initialize',
    value: function initialize() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefAction;

      this.dispatch(action);
    }

    /**
     * 派发一个行为。
     * 在此处会将所有的`middleware`执行一次。
     * 然后将得到的接果传给观察者。
     * @param {object} action
     * @param {function} [callback]
     * @return {Store}
     */

  }, {
    key: 'dispatch',
    value: function dispatch(action, callback) {
      var _this2 = this;

      (0, _utils.assert)((0, _utils.isPureObject)(action), 'action must be a pure object');
      (0, _utils.warning)((0, _utils.isString)(action.type), 'type of action must be a string');

      var next = Object.assign({}, this.state);
      var processor = function processor(result) {
        return Object.assign(next, result);
      };
      var end = function end() {
        _this2.state = (0, _utils.freeze)(Object.assign({}, next));
        _this2.onNext(_this2.state);
        if ((0, _utils.isFunction)(callback)) callback(_this2.state);
      };

      (0, _compose2.default)(this.mw)(action, next, processor, end);
      return this;
    }

    /**
     * 添加中间件。
     * 满足`StoreMiddleware`的定义的函数均可以作为一个中间件。
     * 无论该函数是独立的，还是属于某一个类的成员。
     * 或者某一个对象的属性。
     * @param {StoreMiddleware} mw
     * @return {Store}
     */

  }, {
    key: 'use',
    value: function use(mw) {
      (0, _utils.assert)((0, _utils.isFunction)(mw), 'Middleware must be composed of functions');
      this.mw.push(mw);
      return this;
    }

    /**
     * 获取当存储的 state
     * @return {object}
     */

  }, {
    key: 'getState',
    value: function getState() {
      return Object.assign({}, this.state);
    }
  }]);
  return Store;
}(_Observable3.default);

exports.default = Store;