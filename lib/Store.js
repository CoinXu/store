'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

  /**
   * @param {object} state
   */
  function Store() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Store);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.mw = [];
    _this.state = (0, _extends3.default)({}, state);
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
     * @param {function} callback
     * @private
     * @return {Store}
     */

  }, {
    key: 'dispose',
    value: function dispose(action, callback) {
      var _this2 = this;

      (0, _utils.warning)((0, _utils.isString)(action.type), 'type of action must be a string');

      (0, _compose2.default)(this.mw)(action, this.state, function (result) {
        return Object.assign(_this2.state, result);
      }, function () {
        return callback(_this2.state);
      });
      return this;
    }

    /**
     * 派发单个事件
     * @param {object} action
     * @param {function} [callback]
     * @private
     * @return {Store}
     */

  }, {
    key: 'single',
    value: function single(action, callback) {
      var _this3 = this;

      return this.dispose(action, function (state) {
        _this3.onNext(state);
        if ((0, _utils.isFunction)(callback)) callback(state);
      });
    }

    /**
     * 派发多个事件
     * @param {Array<object>} actions
     * @param {function} [callback]
     * @private
     * @return {Store}
     */

  }, {
    key: 'multiple',
    value: function multiple(actions, callback) {
      var _this4 = this;

      var list = actions.map(function (action) {
        return function (a, b, next) {
          return _this4.dispose(action, function () {
            return next();
          });
        };
      });
      (0, _compose2.default)(list)(null, null, _utils.noop, function () {
        _this4.onNext(_this4.state);
        if ((0, _utils.isFunction)(callback)) callback(_this4.state);
      });
      return this;
    }

    /**
     * 派发事件
     * @param {object|Array<Object>} actionOrActions
     * @param {function} [callback]
     */

  }, {
    key: 'dispatch',
    value: function dispatch(actionOrActions, callback) {

      if ((0, _utils.isPureObject)(actionOrActions)) {
        return this.single(actionOrActions, callback);
      }

      if ((0, _utils.isArray)(actionOrActions) && !actionOrActions.some(function (action) {
        return (0, _utils.assert)((0, _utils.isPureObject)(action), 'action must be a pure object');
      })) {
        return this.multiple(actionOrActions, callback);
      }

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