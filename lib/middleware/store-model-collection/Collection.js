'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../../utils/utils');

var _CollectionModel = require('./CollectionModel');

var _CollectionModel2 = _interopRequireDefault(_CollectionModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {object} CollectionDesc
 * @property {string} name
 * @property {scheduler} scheduler
 * @property {CollectionModel} mod
 */

/**
 * @class
 * ModelCollection 类
 * 传入该类的管理model需要满足如下条件：
 * 1. model.isModel方法存在，并返回 boolean 值
 * 2. 每一个model的内容必须包含一个唯一的id
 */
/**
 * Created on 30/05/2017.
 * @file model集全管理
 */

var Collection = function () {
  /**
   * @param {CollectionDesc} desc
   */
  function Collection(desc) {
    (0, _classCallCheck3.default)(this, Collection);
    var name = desc.name,
        scheduler = desc.scheduler,
        mod = desc.mod;


    (0, _utils.assert)((0, _utils.isString)(name), 'name must be a string');
    (0, _utils.assert)((0, _utils.isFunction)(scheduler), 'scheduler must be a function');
    (0, _utils.assert)(_CollectionModel2.default.isModel(mod), 'model must instance of CollectionModel');

    this.name = name;
    this.mod = mod;
    this.scheduler = scheduler;
    /** @type {Array<CollectionModel>} */
    this.state = [];
  }

  /**
   * 新增一个model
   * @param {CollectionModel|ModelDesc} descOrModel
   * @return {Collection}
   */


  (0, _createClass3.default)(Collection, [{
    key: 'add',
    value: function add(descOrModel) {
      this.state.push(_CollectionModel2.default.isModel(descOrModel) ? descOrModel : this.mod.create(descOrModel));
      return this;
    }

    /**
     * 删除一个model
     * @param {CollectionModel|string|number} idOrModel
     * @return {Collection}
     */

  }, {
    key: 'remove',
    value: function remove(idOrModel) {
      var id = Collection.getModelId(idOrModel);
      this.state = this.state.filter(function (m) {
        return m.id !== id;
      });
      return this;
    }

    /**
     * 通过查找一个model
     * @param {string|number} id
     * @return {CollectionModel|null}
     */

  }, {
    key: 'get',
    value: function get(id) {
      return this.state.find(function (m) {
        return m.id === id;
      });
    }

    /**
     * 获取所有的Model
     * @return {Array.<CollectionModel>}
     */

  }, {
    key: 'list',
    value: function list() {
      return this.state.slice();
    }

    /**
     * @param {function} iterator
     * @param {*} scope
     */

  }, {
    key: 'forEach',
    value: function forEach(iterator, scope) {
      return this.state.forEach(iterator, scope);
    }

    /**
     * @param {function} iterator
     * @param {*} scope
     * @return {Array}
     */

  }, {
    key: 'map',
    value: function map(iterator, scope) {
      return this.state.map(iterator, scope);
    }

    /**
     * 如果scheduler返回一个Array，则会立即调用next方法
     * @param {object} action
     * @param {object} storeState
     * @param {function} next
     * @return {Collection}
     */

  }, {
    key: 'receiver',
    value: function receiver(action, storeState, next) {
      var _this = this;

      var done = function done(state) {
        return _this.done(state, next);
      };
      var state = this.scheduler.call(this, this.state, action, storeState, done);
      if ((0, _utils.isArray)(state)) done(state);
      return this;
    }

    /**
     * @param {Array} state
     * @param {function} next
     * @return {Collection}
     */

  }, {
    key: 'done',
    value: function done(state, next) {
      (0, _utils.assert)((0, _utils.isArray)(state), 'state must be a array');
      next((0, _defineProperty3.default)({}, this.name, this.state));
      return this;
    }
  }, {
    key: 'dispose',
    value: function dispose(action, idOrModel, done, storeState) {
      var id = Collection.getModelId(idOrModel);
      var mod = this.get(id);
      if (mod) {
        mod.receiver(action, storeState, done);
      }
      return this;
    }

    /**
     * @param {CollectionModel|string|number} idOrModel
     */

  }], [{
    key: 'getModelId',
    value: function getModelId(idOrModel) {
      return Collection.isModel(idOrModel) ? idOrModel.id : idOrModel;
    }

    /**
     * @param ins
     * @return {boolean}
     */

  }, {
    key: 'isCollection',
    value: function isCollection(ins) {
      return ins instanceof Collection;
    }
  }]);
  return Collection;
}();

exports.default = Collection;