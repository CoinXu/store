/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _desc, _value, _class, _descriptor;

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

/**
 * @Author sugo.io<asd>
 * @Date 17-10-18
 * @description 类型验证
 */

const toString = Object.prototype.toString;

/**
 * @typedef {Object} ValidTypeDesc
 * @property {string} type
 * @property {string} msg
 */

/**
 * @param {string} type
 * @return {{type: string, msg: string}}
 */
function creator(type) {
  return {
    type,
    msg: `Property [{{key}}] Type Error : Not {{type}}`
  };
}

/**
 *
 * @param {string} key
 * @param {string} type
 * @param {string} template
 * @return {string}
 */
function parser(key, type, template) {
  return template.replace(/{{\s*key\s*}}/, key.toString()).replace(/{{\s*type\s*}}/, type.toString());
}

/**
 * @type {Object<string, ValidTypeDesc>}
 */
const ValidType = {
  PRIM_BOOL: creator('Boolean'),
  PRIM_NUM: creator('Number'),
  PRIM_STR: creator('String'),
  PRIM_NL: creator('Null'),
  PRIM_UNDEF: creator('Undefined'),
  PRIM_SYMBOL: creator('Symbol'),

  OBJ_O: creator('Object'),
  OBJ_A: creator('Array')

  /**
   * 验证装饰器描述对象中的getter函数
   * @callback ValidDescriptorGetter
   * @return {*}
   */

  /**
   * 验证装饰器描述对象中的setter函数
   * @callback ValidDescriptorSetter
   * @param {*} value
   * @return {undefined}
   */

  /**
   * 验证装饰器描述对象
   * @typedef {Object} ValidDescriptor
   * @property {boolean} configurable
   * @property {boolean} enumerable
   * @property {ValidDescriptorGetter} get
   * @property {ValidDescriptorSetter} set
   */

  /**
   * 验证装饰器函数
   * @callback ValidDecorate
   * @param {Object} target
   * @param {string} key
   * @param {Object} descriptor
   * @return {ValidDescriptor}
   */

  /**
   * 生成验证装饰器函数
   * @param {ValidTypeDesc} ValidType
   * @param {string} [msg]
   * @param {string} [messageKey = 'message']
   * @return {ValidDecorate}
   */
};function Valid(ValidType, msg, messageKey = 'message') {

  /** @type {ValidDecorate} */
  return function (target, key, descriptor) {
    msg = msg || ValidType.msg;
    /**
     * @param {*} value
     * @return {boolean}
     */
    function validator(value) {
      if (toString.call(value) !== `[object ${ValidType.type}]`) {
        target[messageKey] = parser(key, ValidType.type, msg);
        return false;
      }
      target[messageKey] = null;
      return true;
    }

    const get = descriptor.get,
          set = descriptor.set,
          initializer = descriptor.initializer;


    let buf = get ? get.call(target) : initializer.call(target);
    // 如果初始值验证不通过则重置为undefined
    if (!validator(buf)) {
      buf = void 0;
    }

    const desc = {
      configurable: false,
      enumerable: true,
      // TODO 预先生成
      get() {
        return buf;
      },
      // TODO 预先生成
      set(value) {
        if (set) {
          set.call(target, value);
        }

        value = get ? get.call(target) : value;
        if (validator(value)) {
          buf = value;
        }
      }
    };

    desc.__proto__ = null;
    return desc;
  };
}

exports.ValidType = ValidType;
exports.Valid = Valid;
let A = (_dec = Valid(ValidType.PRIM_NUM), (_class = class A {
  constructor() {
    _initDefineProp(this, 'a', _descriptor, this);
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'a', [_dec], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class));

/***/ })
/******/ ]);