'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @callback action
 * @param {Object} state
 * @param {function} done
 * @return {*}
 */

/**
 * @callback scheduler
 * @param {Object} state
 * @param {Object} action
 * @param {*}
 */

/**
 * @typedef {Object} ModelDesc
 * @property {String} name
 * @property {Object} state
 * @property {Object<String, action>} actions
 * @property {scheduler} scheduler
 */

/**
 * @class
 * Model实现需要满足如下几个条件
 * 1. state 尽可能不要嵌套
 * 2. state 尽可能纯粹，只是处理接口数据，不必处理成view渲染所需的数据，那是viewModel应该做的事
 * 3. 接口与model分离，请求接口应该放在一个resource中定义，在model中直接调用获得结果即可。
 * 4. 每一个action只做一件事
 * 5. scheduler尽可能纯粹
 * 6. 可观察
 * 7. 何时通知观察者可控
 */

var Model = function () {
  /**
   * @param {ModelDesc} desc
   * @constructor
   */
  function Model(desc) {
    (0, _classCallCheck3.default)(this, Model);
    var name = desc.name,
        scheduler = desc.scheduler,
        state = desc.state;


    (0, _utils.assert)((0, _utils.isString)(name), 'name must be a string');
    (0, _utils.assert)((0, _utils.isFunction)(scheduler), 'scheduler must be a function');
    (0, _utils.assert)((0, _utils.isPureObject)(state), 'state must be a pure object');

    this.name = name;
    this.scheduler = scheduler;
    this.state = Object.assign({}, state);
  }

  /**
   * model需要一个接口来接收被观察时外部传入的参数。
   * 在接收到新的`action`时，便会有新的`next`传入。
   * 此时需要重新创建`actions`的代理。
   * 之后开始调用`scheduler`调度处理程序。
   *
   * 如果`scheduler`返回不是`undefined`，
   * 那么会认为该次接收到的action已被完成处理。
   * 将会自动调用`next`通知`store`当前中间件已执行完成
   *
   * @param {object} action
   * @param {object} storeState
   * @param {function} next
   * @return {Model}
   */


  (0, _createClass3.default)(Model, [{
    key: 'receiver',
    value: function receiver(action, storeState, next) {
      var _this = this;

      var done = function done(state) {
        return _this.done(state, next);
      };
      var state = this.scheduler.call(this, Object.assign({}, this.state), action, done);
      if (!(0, _utils.isUndefined)(state)) done(state);
      return this;
    }

    /**
     * 当处理完一个`action`时，该方法将会被调用。
     * 调用此方法时，将会通知观察者，并将当前的最终`state`传入观察者。
     * 请注意，该函数只接收一个纯粹的`Object`对象。
     * 其他参数一律抛出错误。
     * @param {object} state
     * @param {function} next
     * @return {Model}
     */

  }, {
    key: 'done',
    value: function done(state, next) {
      (0, _utils.assert)((0, _utils.isPureObject)(state), 'state must be a pure object');

      Object.assign(this.state, state);
      next((0, _defineProperty3.default)({}, this.name, Object.assign({}, this.state)));

      return this;
    }

    /**
     * 验证一个对象是否是Model的实例
     * @param ins
     * @return {boolean}
     */

  }], [{
    key: 'isModel',
    value: function isModel(ins) {
      return ins instanceof Model;
    }
  }]);
  return Model;
}(); /**
      * Created on 28/04/2017.
      * @file 定义一个model
      * 该model定义连初版都算不上，待讨论修正，不要用于正式环境。
      */

exports.default = Model;