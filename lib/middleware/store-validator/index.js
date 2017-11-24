'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeValidatorCreator = undefined;

var _utils = require('../../utils/utils');

var _Validator = require('./Validator');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /**
                                                                                                                                                                                                                   * @author coinxu<duanxian0605@gmail.com>
                                                                                                                                                                                                                   * @date   22/10/2017
                                                                                                                                                                                                                   * @description
                                                                                                                                                                                                                   */

/**
 * @typedef {callback} map
 * @param {Validator} model
 * @return {Object}
 */

/**
 * @typedef {Object} StoreValidatorDesc
 * @property {string} namespace
 * @property {Validator} model
 * @property {scheduler} scheduler
 * @property {map} map
 */

/**
 * @param {StoreValidatorDesc} desc
 * @param {Store} store
 * @return {Store}
 */
function storeValidatorCreator(desc, store) {
  (0, _utils.assert)((0, _utils.isObject)(desc), 'store validator descriptor must be type of string');

  var namespace = desc.namespace,
      model = desc.model,
      scheduler = desc.scheduler,
      map = desc.map;


  (0, _utils.assert)((0, _utils.isString)(namespace), 'desc.namespace must be type of string');
  (0, _utils.assert)((0, _utils.isFunction)(scheduler), 'desc.namespace must be type of function');
  (0, _utils.assert)((0, _utils.isFunction)(map), 'desc.map must be type of function');
  (0, _utils.assert)(_Validator.Validator.isValidator(model), 'desc.model must be instance of Validator class');

  store.use(function (action, state, next) {
    scheduler(action, model, function () {
      next(_defineProperty({}, namespace, map(model)));
    });
  });

  return store;
}

exports.default = storeValidatorCreator;
exports.storeValidatorCreator = storeValidatorCreator;