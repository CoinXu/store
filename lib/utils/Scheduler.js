'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scheduler = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scheduler = function () {
  /**
   * 初始化时可以传入subscriber
   */
  function Scheduler() {
    (0, _classCallCheck3.default)(this, Scheduler);

    this.tasks = [];
  }

  /**
   * 压入回调
   * @param {Function} callback
   * @return {Scheduler}
   */


  (0, _createClass3.default)(Scheduler, [{
    key: 'push',
    value: function push(callback) {
      (0, _utils.assert)((0, _utils.isFunction)(callback), 'Callback must be a function in for Scheduler');
      this.tasks.push(callback);
      this.dispose();
      return this;
    }

    /**
     * 处理任务
     * @return {Scheduler}
     */

  }, {
    key: 'dispose',
    value: function dispose() {
      if (this.tasks.length === 0) {
        return this;
      }

      var callback = this.tasks.shift();

      setTimeout(function () {
        try {
          callback();
        } catch (e) {
          // TODO 考虑如何处理message
        }
      }, 0);

      return this;
    }
  }]);
  return Scheduler;
}(); /**
      * Created by asd on 17-8-4.
      * @description 异步任务调度器
      * 1. 注册任务函数
      * 2. 压入任务参数
      * 3. 由该调度器决定何时调用回调函数
      *
      *  @example
      * ```js
      * const scheduler = new Scheduler()
      * scheduler.subscribe(state => console.log(state))
      *
      * scheduler.push({a:1})
      * scheduler.push({a:2})
      * scheduler.push({a:3})
      * ``
      */

exports.Scheduler = Scheduler;