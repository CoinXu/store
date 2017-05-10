'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ViewModel = require('./ViewModel');

var _ViewModel2 = _interopRequireDefault(_ViewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * <h2>管理model的中间件</h2>
 * <p>这是目前唯一的一个中间件，model实现方法还在探索中。</p>
 * @param {Array<ViewModel|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeViewModelCreator(mods, store) {
  mods.map(function (m) {
    return _ViewModel2.default.isModel(m) ? m : new _ViewModel2.default(m, store);
  }).map(function (mod) {
    store.use(function (action, state, next) {
      mod.receiver(action, state, next);
    });
  });
  return store;
} /**
   * Created on 29/04/2017.
   */

exports.default = storeViewModelCreator;