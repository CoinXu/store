'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

exports.default = function (desc, store) {
  var collection = new _Collection2.default(desc.primaryKey);

  store.use(function (action, state, next) {
    desc.scheduler(action, collection, function (props) {
      var ret = { list: collection.get() };
      if ((0, _utils.isObject)(props)) {
        (0, _utils.assert)(props.list === void 0, 'Props can not have a key which named [list]');
        Object.assign(ret, props);
      }
      next((0, _defineProperty3.default)({}, desc.name, ret));
    });
  });

  return store;
};

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }