'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Created on 28/04/2017.
                                                                                                                                                                                                                                                                   * @file 状态管理核心类
                                                                                                                                                                                                                                                                   */

var _utils = require('./utils/utils');

var _compose = require('./utils/compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DefAction = { type: '__INITIALIZE__ACTION__'

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

};let Store = class Store {

  /**
   * @constructor
   * @param {object} state
   */
  constructor(state = {}) {
    this.mw = [];
    this.state = _extends({}, state);
    this.observer = _utils.noop;
  }

  /**
   * 初始化时，默认会发出一个初始化的action。
   * 当然用户也可指定。
   * @param {object} [action]
   */
  initialize(action = DefAction) {
    return this.dispatch(action);
  }

  /**
   * 派发一个行为。
   * 在此处会将所有的`middleware`执行一次。
   * 然后将得到的接果传给观察者。
   * @param {object} action
   * @param {function} callback
   * @return {Store}
   * @private
   */
  _dispose(action, callback) {
    (0, _utils.warning)((0, _utils.isString)(action.type), 'type of action must be a string');

    (0, _compose2.default)(this.mw)(action, this.state, result => Object.assign(this.state, result), () => callback(this.state));
    return this;
  }

  /**
   * 派发单个事件
   * @param {object} action
   * @param {function} [callback]
   * @private
   * @return {Store}
   */
  single(action, callback) {
    return this._dispose(action, state => {
      this.observer(state);
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
  multiple(actions, callback) {
    const list = actions.map(action => (a, b, next) => this._dispose(action, () => next()));
    (0, _compose2.default)(list)(null, null, _utils.noop, () => {
      this.observer(this.state);
      if ((0, _utils.isFunction)(callback)) callback(this.state);
    });
    return this;
  }

  /**
   * 派发事件
   * @param {object|Array<Object>} actionOrActions
   * @param {function} [callback]
   */
  dispatch(actionOrActions, callback) {

    if ((0, _utils.isPureObject)(actionOrActions)) {
      return this.single(actionOrActions, callback);
    }

    if ((0, _utils.isArray)(actionOrActions) && !actionOrActions.some(action => (0, _utils.assert)((0, _utils.isPureObject)(action), 'action must be a pure object'))) {
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
  use(mw) {
    (0, _utils.assert)((0, _utils.isFunction)(mw), 'Middleware must be composed of functions');
    this.mw.push(mw);
    return this;
  }

  /**
   * 获取当存储的 state
   * @return {object}
   */
  getState() {
    return Object.assign({}, this.state);
  }

  /**
   * 注册观察者
   * @param {function} observer
   * @return {Store}
   */
  subscribe(observer) {
    (0, _utils.assert)((0, _utils.isFunction)(observer), 'observer must be a function');
    this.observer = observer;
    return this;
  }
};
exports.default = Store;