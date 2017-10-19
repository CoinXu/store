'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (desc, store) {
  const collection = new _Collection2.default(desc.primaryKey);
  const state = { list: collection.get() };

  store.use(function (action, storeState, next) {
    desc.scheduler.call(store, action, collection, function (props) {
      state.list = collection.get();

      if ((0, _utils.isObject)(props)) {
        (0, _utils.assert)(props.list === void 0, 'Props can not have a key which named [list]');
        Object.assign(state, props);
      }

      next({ [desc.name]: state });
    });
  });

  return store;
};

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }