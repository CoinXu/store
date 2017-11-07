'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ViewModel = require('./ViewModel');

var _ViewModel2 = _interopRequireDefault(_ViewModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 管理`viewModel`中间件
 * @param {Array<ViewModel|ModelDesc>} mods
 * @param {Store} store
 * @return {Store}
 */
function storeViewModelCreator(mods, store) {
  mods.map(function (m) {
    return _ViewModel2.default.isViewModel(m) ? m : new _ViewModel2.default(m, store);
  }).map(function (mod) {
    return store.use(function (action, state, next) {
      return mod.receiver(action, state, next);
    });
  });
  return store;
} /**
   * Created on 29/04/2017.
   */

exports.default = storeViewModelCreator;