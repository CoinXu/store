'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * <h2>管理`Collection`的中间件</h2>
 * <p>`Collection`设计还在探索中</p>
 * @param {Array<Collection|CollectionDesc>} collections
 * @param {Store} store
 * @return {Store}
 */
function storeCollectionCreator(collections, store) {
  collections.map(function (c) {
    return _Collection2.default.isCollection(c) ? c : new _Collection2.default(c);
  }).map(function (c) {
    return store.use(function (action, state, next) {
      return c.receiver(action, state, next);
    });
  });
  return store;
} /**
   * Created on 29/04/2017.
   */

exports.default = storeCollectionCreator;