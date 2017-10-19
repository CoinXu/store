'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model = require('../store-model/Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * `ViewModel`与`Model`的唯一区别就是多了一个`store`属性。
 * 因为`Model`为了保持其纯粹性，每个`Model`都是独立存在的，不必依赖于某一个`Store`。
 * 而`ViewModel`中包含了诸多的业务逻辑，一定是与某一个具体的`Store`相关。
 * 而且在任何时候都需要有`dispatch`的能力。
 */
let ViewModel = class ViewModel extends _Model2.default {
  /**
   * @override
   * @param {ModelDesc} desc
   * @param {Store} store
   */
  constructor(desc, store) {
    super(desc);
    this.store = store;
  }

  /**
   * 验证传入对象是否是`ViewModel`的实例
   * @param ins
   * @return {boolean}
   */
  static isViewModel(ins) {
    return ins instanceof ViewModel;
  }
}; /**
    * Created on 10/05/2017.
    */

exports.default = ViewModel;