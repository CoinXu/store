'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeModelCreator = exports.Store = undefined;

var _Store = require('./Store');

var _Store2 = _interopRequireDefault(_Store);

var _storeModel = require('./middleware/store-model');

var _storeModel2 = _interopRequireDefault(_storeModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created on 30/04/2017.
 */

exports.Store = _Store2.default;
exports.storeModelCreator = _storeModel2.default;