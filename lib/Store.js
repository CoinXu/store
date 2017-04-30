'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Observable2 = require('./Observable');

var _Observable3 = _interopRequireDefault(_Observable2);

var _utils = require('./utils/utils');

var _compose = require('./utils/compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created on 28/04/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file 状态管理核心类
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var DefAction = { type: '__INITIALIZE__ACTION__' };

/**
 * @class
 * 该类提供状态管理的基本功能。
 * 扩展功能以中间件的方式实现。
 * 该类可观察。
 */

var Store = function (_Observable) {
  _inherits(Store, _Observable);

  function Store() {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this));

    _this.mw = [];
    _this.state = {};
    return _this;
  }

  /**
   * 初始化时，默认会发出一个初始化的action。
   * 当然用户也可指定。
   * @param {Object} action
   */


  _createClass(Store, [{
    key: 'initialize',
    value: function initialize() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefAction;

      this.dispatch(action);
    }

    /**
     * 派发一个行为。
     * 在此处会将所有的`middleware`执行一次。
     * 然后将得到的接果传给观察者。
     * @param action
     * @return {Store}
     */

  }, {
    key: 'dispatch',
    value: function dispatch(action) {
      var _this2 = this;

      (0, _utils.assert)((0, _utils.isPureObject)(action), 'action must be a pure object');
      (0, _utils.warning)((0, _utils.isString)(action.type), 'type of action must be a string');

      var next = Object.assign({}, this.state);
      var processor = function processor(result) {
        return Object.assign(next, result);
      };
      var complete = function complete() {
        _this2.state = next;
        _this2.onNext(next);
      };

      (0, _compose2.default)(this.mw)(action, next, processor, complete);
      return this;
    }

    /**
     * 添加中间件。
     * 中间件定义为一个函数。
     * 包含如下参数：
     * + action
     * + state
     * + next
     * 满足以上条件的函数均可以作为一个中间件。
     * 无论该函数是独立的，还是属于某一个类的成员。
     * 或者某一个对象的属性。
     * @param {Function} mw
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
     * @return {{}|*}
     */

  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }]);

  return Store;
}(_Observable3.default);

exports.default = Store;