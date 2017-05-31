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

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Model2 = require('../store-model/Model');

var _Model3 = _interopRequireDefault(_Model2);

var _utils = require('../../utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created on 30/05/2017.
 */

var CollectionModel = function (_Model) {
  (0, _inherits3.default)(CollectionModel, _Model);

  /**
   * desc.state如果有id属性，则不必传入id
   * 如果两个都有，优先取id
   * @param {ModelDesc} desc
   * @param {string|number} [id]
   */
  function CollectionModel(desc, id) {
    (0, _classCallCheck3.default)(this, CollectionModel);

    id = (0, _utils.isUndefined)(id) ? desc.state.id : id;
    (0, _utils.assert)((0, _utils.legalId)(id), 'state must have an id property');

    var _this = (0, _possibleConstructorReturn3.default)(this, (CollectionModel.__proto__ || Object.getPrototypeOf(CollectionModel)).call(this, desc));

    _this.id = id;
    _this.desc = desc;
    return _this;
  }

  /**
   * 创建一个新的实例
   * @param {ModelDesc} desc
   * @param {string|number} [id]
   */


  (0, _createClass3.default)(CollectionModel, [{
    key: 'create',
    value: function create(desc, id) {
      desc = (0, _extends3.default)({}, this.desc, (0, _utils.isPureObject)(desc) ? desc : {});
      return new CollectionModel(desc, id);
    }

    /**
     * @override
     * @param ins
     * @return {boolean}
     */

  }], [{
    key: 'isModel',
    value: function isModel(ins) {
      return ins instanceof CollectionModel;
    }
  }]);
  return CollectionModel;
}(_Model3.default);

exports.default = CollectionModel;