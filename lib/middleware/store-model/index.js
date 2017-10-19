'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * <h2>管理`model`的中间件</h2>
 * <p>`model`设计还在探索中</p>
 * @param {Array<Model|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeModelCreator(mods, store) {
  mods.map(m => _Model2.default.isModel(m) ? m : new _Model2.default(m)).map(mod => store.use((action, state, next) => mod.receiver(action, state, next)));
  return store;
} /**
   * Created on 29/04/2017.
   */

exports.default = storeModelCreator;