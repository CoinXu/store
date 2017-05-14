'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * <h2>管理model的中间件</h2>
 * <p>这是目前唯一的一个中间件，model实现方法还在探索中。</p>
 * @param {Array<Model|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeModelCreator(mods, store) {
  mods.map(function (m) {
    return _Model2.default.isModel(m) ? m : new _Model2.default(m);
  }).map(function (mod) {
    store.use(function (action, state, next) {
      mod.receiver(action, state, next);
    });
  });
  return store;
} /**
   * Created on 29/04/2017.
   */

exports.default = storeModelCreator;