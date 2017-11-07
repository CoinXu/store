'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Author sugo.io<asd>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @Date 17-9-14
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('../../utils/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {Object} CollectionJSON
 * @property {Array} models
 * @property {Array} toDelete
 * @property {Array} toUpdate
 * @property {Array} toCreate
 */

/**
 * @typedef {Object} Collection
 * @property {Array<Object>} _models      - 所有model
 * @property {object} _cache      - 初始时保存的model，与_models作对比，确定应该添加、删除或更新
 * @property {object} _to_del     - 需要删除的记录
 * @property {object} _to_update  - 需要更新的记录
 * @property {object} _to_create  - 需要创建的记录
 * @property {string} _primaryKey - 主键字段
 *
 * @property {Function} reset   - 重置_cache
 * @property {Function} remove  - 删除一条记录
 * @property {Function} update  - 更新一条记录
 * @property {Function} add     - 添加一条记录
 * @property {Function} sort    - 排序
 * @property {Function} at      - 获取某个位置上的元素
 * @property {Function} last    - 获取最后一个元素
 * @property {Function} find    - 查找记录
 * @property {Function} get     - 获取所有的记录
 * @property {Function} toString
 * @property {Function} toJSON
 */

/**
 * @typedef {Object} CollectionDesc
 * @property {string} name
 * @property {string} primaryKey
 * @property {Function} scheduler
 */

var generate = function () {
  var counter = 0;
  return function () {
    return 'STORE_COLLECTION_PRIMARY_KEY_' + counter++;
  };
}();

var Collection = function () {
  /**
   * @param {string} primaryKey
   * @param {Array} mods
   */
  function Collection(primaryKey) {
    var mods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Collection);

    (0, _utils.assert)((0, _utils.isString)(primaryKey) && !!primaryKey, 'Primary key must be a string and required');
    this._primaryKey = primaryKey;
    this.reset(mods);
  }

  /**
   * 重置Collection
   * @param {Array<Object>} mods
   * @return {Collection}
   * @private
   */


  _createClass(Collection, [{
    key: 'reset',
    value: function reset(mods) {
      (0, _utils.assert)((0, _utils.isArray)(mods), 'Models must be a Array');

      var map = {};
      var primaryKey = this._primaryKey;

      mods.forEach(function (mod) {
        (0, _utils.assert)((0, _utils.isObject)(mod), 'Each model muse be a object');
        map[mod[primaryKey]] = mod;
      });

      this._cache = map;
      // TODO use link data structure
      this._models = mods;
      this._to_del = {};
      this._to_update = {};
      this._to_create = {};
      return this;
    }

    /**
     * 移除model，可传primaryKey和model本身
     * @param {string|Object} keyOrMod
     * @return {Collection}
     */

  }, {
    key: 'remove',
    value: function remove(keyOrMod) {
      var _this = this;

      var notPrimaryKey = (0, _utils.isObject)(keyOrMod);
      var primaryKey = notPrimaryKey ? keyOrMod[this._primaryKey] : keyOrMod;

      this._models = this._models.filter(function (m) {
        return notPrimaryKey ? m !== keyOrMod : m[_this._primaryKey] !== keyOrMod;
      });
      this._to_del[primaryKey] = true;
      this._to_create[primaryKey] = false;
      this._to_update[primaryKey] = false;
      return this;
    }

    /**
     * 更新model
     * @param {string|number} primaryValue
     * @param {Object} props
     * @return {Collection}
     */

  }, {
    key: 'update',
    value: function update(primaryValue, props) {
      var _this2 = this;

      (0, _utils.assert)((0, _utils.isString)(primaryValue) || (0, _utils.isNumber)(primaryValue), 'Primary value must be String or Number instance');
      (0, _utils.assert)((0, _utils.isObject)(props), 'Props must be a Object');

      this._models = this._models.map(function (m) {
        return m[_this2._primaryKey] === primaryValue ? _extends({}, m, props) : m;
      });

      // 如果在创建列表，则不需要写入更新列表
      if (!this._to_create[primaryValue]) {
        this._to_update[primaryValue] = true;
      }
      return this;
    }

    /**
     * 添加model
     * @param {Object} mod
     * @return {Collection}
     */

  }, {
    key: 'add',
    value: function add(mod) {
      (0, _utils.assert)((0, _utils.isObject)(mod), 'Model must be a Object');

      if (mod[this._primaryKey] === void 0) {
        mod[this._primaryKey] = generate();
      }

      this._models = this._models.concat(mod);
      this._to_create[mod[this._primaryKey]] = true;
      return this;
    }

    /**
     * 排序
     * @param {Function} compare
     * @return {Collection}
     */

  }, {
    key: 'sort',
    value: function sort(compare) {
      (0, _utils.assert)((0, _utils.isFunction)(compare), 'Compare must be a Function instance');
      this._models = this._models.sort(compare);
      return this;
    }

    /**
     * 获取index位置的model
     * @param {number} index
     * @return {Object|null}
     */

  }, {
    key: 'at',
    value: function at(index) {
      return this._models[index] || null;
    }

    /**
     * 获取最后一个model
     * @return {Object}
     */

  }, {
    key: 'last',
    value: function last() {
      return this.at(this._models.length - 1);
    }

    /**
     * 查找model
     * @param {Object} filter
     * @return {Object|null}
     */

  }, {
    key: 'find',
    value: function find(filter) {
      (0, _utils.assert)((0, _utils.isObject)(filter), 'Filter must be a Object');

      var keys = Object.keys(filter);

      // 如果没有传入比较属性，直接返回null
      if (keys.length === 0) {
        return null;
      }

      return this._models.find(function (mod) {
        return keys.every(function (k) {
          return filter[k] === mod[k];
        });
      }) || null;
    }

    /**
     * 返回所有model
     * @return {Array.<Object>}
     */

  }, {
    key: 'get',
    value: function get() {
      return this._models.slice();
    }

    /**
     * @return {string}
     */

  }, {
    key: 'toString',
    value: function toString() {
      return '[object StoreCollection]';
    }

    /**
     * 将所有的model分为三类:toDelete\toUpdate\toCreate并返回
     * @return {{models: Array.<Object>, toDelete: Array, toUpdate: Array, toCreate: Array}}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var toDelete = [];
      var toUpdate = [];
      var toCreate = [];

      var md = this._to_del;
      var mu = this._to_update;
      var mc = this._to_create;

      var primaryKey = this._primaryKey;
      var cache = this._cache;

      var key = null;

      this._models.forEach(function (m) {
        key = m[primaryKey];

        if (mu[key]) {
          toUpdate.push(m);
        }

        if (mc[key]) {
          toCreate.push(m);
        }
      });

      for (var _key in md) {
        if (md[_key] && cache[_key]) {
          toDelete.push(cache[_key]);
        }
      }

      return {
        models: this._models.slice(),
        toDelete: toDelete,
        toUpdate: toUpdate,
        toCreate: toCreate
      };
    }
  }]);

  return Collection;
}();

exports.default = Collection;