'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created on 28/04/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @file 定义一个model
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 该model定义连初版都算不上，待讨论修正，不要用于正式环境。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('../../utils/utils');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 一个`scheduler`被调用时，会传入如下几个参数
 * + state 当前`model`的状态
 * + action 触发当前调用的`action`
 * + done 完成此次`action`时通知`model`
 * @callback scheduler
 * @param {Object} state
 * @param {Object} action
 * @param {function} done
 */

/**
 * `model`描述组成
 * @typedef {Object} ModelDesc
 * @property {String} name - `model`名称，必须且在一个`Store`中唯一
 * @property {Object} state - `model`初始状态
 * @property {scheduler} scheduler - 调度器
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
    _classCallCheck(this, Model);

    var name = desc.name,
        scheduler = desc.scheduler,
        state = desc.state;


    (0, _utils.assert)((0, _utils.isString)(name), 'name must be a string');
    (0, _utils.assert)((0, _utils.isFunction)(scheduler), 'scheduler must be a function');
    (0, _utils.assert)((0, _utils.isPureObject)(state), 'state must be a pure object');

    this.name = name;
    this.scheduler = scheduler;
    this.state = _extends({}, state);
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


  _createClass(Model, [{
    key: 'receiver',
    value: function receiver(action, storeState, next) {
      var _this = this;

      var done = function done(state) {
        return _this.done(state, next);
      };
      var state = this.scheduler.call(this, this.state, action, done);

      if ((0, _utils.isPureObject)(state)) done(state);
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
      next(_defineProperty({}, this.name, _extends({}, this.state)));

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
}();

exports.default = Model;