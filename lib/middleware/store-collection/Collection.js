'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

// https://github.com/CoinXu/store/issues/1
/**
 * interface CollectionJSON<T> {
 *   models: T[]
 *   toDelete: T[]
 *   toUpdate: T[]
 *   toCreate: T[]
 * }
 * // collection structure
 * interface Collection<T> {
 *    readonly _models: T[]
 *    readonly _cache: T[]
 *    readonly _to_del: T[]
 *    readonly _to_update: T[]
 *    readonly _to_create: T[]
 *
 *    // methods
 *    reset(mods: T[]): Collection<T>
 *    remove(mod: T): Collection<T>
 *    update(mod: T): Collection<T>
 *    add(mod: T): Collection<T>
 *    sort(compare: (a: T, b: T) => number): Collection<T>
 *    at(index: number): T || null
 *    find(filter: (mod: T): boolean):  T || null
 *    get(): T[]
 *    toString(): string
 *    toJson(): CollectionJSON<T>
 * }
 *
 * interface CollectionDesc<T> {
 *   name: string
 *   scheduler(action: any, col: Collection<T>, next: () => void)
 * }
 *
 * // wrapper
 * function storeCollectionCreator<T, U>(desc: CollectionDesc<T>, Store<U>): Store<U>
 *
 * // define
 * interface Book {
 *    title: name
 *    price: number
 * }
 *
 * interface Action {
 *   type: string
 *   payload: any
 * }
 *
 * const desc: CollectionDesc<Book> = {
 *   name: 'books',
 *   scheduler(action: Action, collection: Collection<Book>, next: (ret: any) => void) {
 *      if (action.type === 'ADD_BOOK') {
 *       collection.add(action.payload)
 *     }
 *     if(action.type === 'SAVE_BOOK') {
 *        return new Promise(async function(resolve){
 *           // sync to server
 *           const json: CollectionJSON<Book> = collection.toJSON();
 *           await fetch('/api/book/create', {
 *              ...
 *              body: JSON.stringify(json.toCreate)
 *           })
 *           await fetch('/api/book/del', {
 *              ...
 *              body: JSON.stringify(json.toDelete)
 *           })
 *           ... make update ...
 *           resolve(collection.get())
 *        }).then( function(){ next() })
 *     }
 *     next(collection.get())
 *   }
 * }
 * // use
 * const store = new Store()
 * storeCollectionCreator<Book, any>(desc, store)
 * store.dispatch({
 *   type: 'ADD_BOOK',
 *   payload: {
 *    title: 'C primer plus',
 *    price: '￥60.00'
 * }
 */

var generate = function () {
  var counter = 0;
  return function () {
    return 'STORE_COLLECTION_PRIMARY_KEY_' + counter++;
  };
}(); /**
      * @Author sugo.io<asd>
      * @Date 17-9-14
      */

var Collection = function () {
  /**
   * @param {string} primaryKey
   * @param {Array} mods
   */
  function Collection(primaryKey) {
    var mods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    (0, _classCallCheck3.default)(this, Collection);

    (0, _utils.assert)((0, _utils.isString)(primaryKey) && !!primaryKey, 'Primary key must be a string and required');
    this._primaryKey = primaryKey;
    this._reset(mods);
  }

  /**
   * 重置Collection
   * @param {Array<Object>} mods
   * @return {Collection}
   * @private
   */


  (0, _createClass3.default)(Collection, [{
    key: '_reset',
    value: function _reset(mods) {
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
     * 匹配model
     * 1. 检测primaryKey是否相同
     * 2. 检测两个Object对象是否是同一个
     * @param {string|Object} keyOrMod
     * @param {Object} mod
     * @return {boolean}
     * @private
     */

  }, {
    key: '_match',
    value: function _match(keyOrMod, mod) {
      return mod[this._primaryKey] === keyOrMod || mod === keyOrMod;
    }

    /**
     * 重置Collection
     * @param {Array<Object>} mods
     * @return {Collection}
     */

  }, {
    key: 'reset',
    value: function reset(mods) {
      return this._reset(mods);
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

      this._models = this._models.filter(function (m) {
        return !_this._match(keyOrMod, m);
      });

      var primaryKey = (0, _utils.isObject)(keyOrMod) ? keyOrMod[this._primaryKey] : keyOrMod;
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
        return m[_this2._primaryKey] === primaryValue ? (0, _extends3.default)({}, m, props) : m;
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