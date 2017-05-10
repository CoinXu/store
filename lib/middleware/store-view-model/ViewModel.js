'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Model2 = require('../store-model/Model');

var _Model3 = _interopRequireDefault(_Model2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * `ViewModel`与`Model`的唯一区别就是多了一个`store`属性。
 * 因为`Model`为了保持其纯粹性，每个`Model`都是独立存在的，不必依赖于某一个`Store`。
 * 而`ViewModel`中包含了诸多的业务逻辑，一定是与某一个具体的`Store`相关。
 * 而且在任何时候都需要有`dispatch`的能力。
 */
var ViewModel = function (_Model) {
  (0, _inherits3.default)(ViewModel, _Model);

  /**
   * @override
   * @param {ModelDesc} desc
   * @param {Store} store
   */
  function ViewModel(desc, store) {
    (0, _classCallCheck3.default)(this, ViewModel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ViewModel.__proto__ || Object.getPrototypeOf(ViewModel)).call(this, desc));

    _this.store = store;
    return _this;
  }

  return ViewModel;
}(_Model3.default); /**
                     * Created on 10/05/2017.
                     */

exports.default = ViewModel;