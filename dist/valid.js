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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @Author sugo.io<asd>
 * @Date 17-10-20
 */

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * @param {string} temp
 * @param {Object} values
 * @return {string}
 * @example
 * ```js
 * template('{{key}} is {{value}}', {key:'k', value: 'v'}) // k is v
 * ```
 */
function template(temp, values) {
  for (let propKey in values) {
    if (!hasOwnProperty.call(values, propKey)) continue;
    temp = temp.replace(new RegExp(`{{${propKey}}}`, 'g'), values[propKey]);
  }
  return temp;
}

/**
 * @typedef {Object} ValidatorBuffer
 * @property {string} msg
 * @property {Validator} validator
 */

/**
 * @typedef {Object} TargetValidator
 * @property {Object} target
 * @property {Object<string, Array<ValidatorBuffer>>} validator
 */

/**
 * @class 缓存验证器
 */
let Wrapper = class Wrapper {
  constructor() {
    /** @type {Array<TargetValidator>} */
    this.buffer = [];
  }

  /**
   * @param {Object} target
   * @param {string} key
   * @param {Validator} validator
   * @param {string} msg
   * @return {Wrapper}
   */
  add(target, key, validator, msg) {
    let buf = this.buffer.find(buf => buf.target === target);

    if (buf) {
      const arr = buf.validator[key] || (buf.validator[key] = []);
      arr.push({ msg, validator });
      return this;
    }

    this.buffer.push({
      target,
      validator: {
        [key]: [{ msg, validator }]
      }
    });

    return this;
  }

  /**
   * @param {Object} target
   * @param {Object} values
   * @return {Object<string, Array<string>>}
   */
  valid(target, values) {
    const buf = this.get(target);
    const results = [];

    if (buf === null) {
      return results;
    }

    const validator = buf.validator;
    let propKey;
    let valid;
    let fault;
    let msg;

    for (propKey in validator) {
      if (!hasOwnProperty.call(validator, propKey) || !hasOwnProperty.call(values, propKey)) {
        continue;
      }

      valid = validator[propKey];
      msg = [];
      fault = valid.some(function (vb) {
        if (vb.validator(values[propKey])) {
          return false;
        }
        msg.push(template(vb.msg, { key: propKey }));
        return true;
      });

      if (fault) {
        results[propKey] = msg;
      }
    }

    return results;
  }

  /**
   * @param {Object} target
   * @return {Object<string, Array<ValidatorBuffer>>|null}
   */
  get(target) {
    return this.buffer.find(buf => buf.target === target) || null;
  }

  /**
   * @param {Object} target
   * @return {Wrapper}
   */
  destory(target) {
    this.buffer = this.buffer.filter(buf => buf.target !== target);
    return this;
  }
};


const DefaultWrapper = new Wrapper();

/**
 * @param {Validator} validator
 * @param {string} msg
 * @return {ValidDecorate}
 */
function decorate(validator, msg) {
  return function (target, key, descriptor) {
    DefaultWrapper.add(target, key, validator, msg);
    return descriptor;
  };
}

exports.DefaultWrapper = DefaultWrapper;
exports.hasOwnProperty = hasOwnProperty;
exports.decorate = decorate;
exports.template = template;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = exports.Min = exports.Max = exports.RangeLen = exports.MinLen = exports.MaxLen = exports.Required = exports.Pattern = exports.Enum = exports.DateTypes = exports.DateType = undefined;

var _dataType = __webpack_require__(4);

var _enum = __webpack_require__(5);

var _lenMax = __webpack_require__(6);

var _lenMin = __webpack_require__(7);

var _lenRange = __webpack_require__(8);

var _max = __webpack_require__(9);

var _min = __webpack_require__(10);

var _range = __webpack_require__(12);

var _pattern = __webpack_require__(11);

var _required = __webpack_require__(13);

/**
 * @Author sugo.io<asd>
 * @Date 17-10-19
 */

exports.DateType = _dataType.DateType;
exports.DateTypes = _dataType.DateTypes;
exports.Enum = _enum.Enum;
exports.Pattern = _pattern.Pattern;
exports.Required = _required.Required;
exports.MaxLen = _lenMax.MaxLen;
exports.MinLen = _lenMin.MinLen;
exports.RangeLen = _lenRange.RangeLen;
exports.Max = _max.Max;
exports.Min = _min.Min;
exports.Range = _range.Range;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreModel = undefined;

var _valid = __webpack_require__(0);

let StoreModel = class StoreModel {

  /**
   * @param {function} listener
   * @return {StoreModel}
   */
  listen(listener) {
    this.listener = listener;
    return this;
  }

  /**
   * @param {Object} values
   * @return {StoreModel}
   */
  map(values) {
    const msg = _valid.DefaultWrapper.valid(this.__proto__, values);

    let propKey;

    for (propKey in values) {
      if (!_valid.hasOwnProperty.call(values, propKey)) continue;
      if (!_valid.hasOwnProperty.call(msg, propKey)) continue;
      this[propKey] = values[propKey];
    }

    if (this.listener) {
      this.listener(msg);
    }

    return this;
  }
}; /**
    * @Author sugo.io<asd>
    * @Date 17-10-20
    */

exports.StoreModel = StoreModel;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _dec8, _dec9, _dec10, _desc2, _value2, _class3, _descriptor4; /**
                                                                                                                                                                                   * @Author sugo.io<asd>
                                                                                                                                                                                   * @Date 17-10-19
                                                                                                                                                                                   */


var _Model = __webpack_require__(2);

var _validator = __webpack_require__(1);

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

const Gender = {
  Female: 0,
  Male: 1
};

let User = (_dec = (0, _validator.Range)([0, 200]), _dec2 = (0, _validator.DateType)(_validator.DateTypes.PRIM_NUM), _dec3 = (0, _validator.Required)(), _dec4 = (0, _validator.RangeLen)([4, 32]), _dec5 = (0, _validator.DateType)(_validator.DateTypes.PRIM_STR), _dec6 = (0, _validator.Required)(), _dec7 = (0, _validator.Enum)(Gender), (_class = class User extends _Model.StoreModel {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), _initDefineProp(this, 'age', _descriptor, this), _initDefineProp(this, 'name', _descriptor2, this), _initDefineProp(this, 'gender', _descriptor3, this), _temp;
  }

}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'age', [_dec, _dec2, _dec3], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'name', [_dec4, _dec5, _dec6], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'gender', [_dec7], {
  enumerable: true,
  initializer: function initializer() {
    return null;
  }
})), _class));


const user = new User();

/**
 * @param {Array<ValidMessage>} msg
 */
function listener(msg) {
  console.log(msg);
}

user.listen(listener);

//user.age = 0
//user.name = 'demo'
//user.gender = Gender.Female

window.user = user;

let GameUser = (_dec8 = (0, _validator.Range)([0, 175]), _dec9 = (0, _validator.DateType)(_validator.DateTypes.PRIM_NUM), _dec10 = (0, _validator.Required)(), (_class3 = class GameUser extends _Model.StoreModel {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), _initDefineProp(this, 'level', _descriptor4, this), _temp2;
  }

}, (_descriptor4 = _applyDecoratedDescriptor(_class3.prototype, 'level', [_dec8, _dec9, _dec10], {
  enumerable: true,
  initializer: function initializer() {
    return 0;
  }
})), _class3));


const guser = window.guser = new GameUser();
guser.listen(function (msg) {
  console.log('guser => ', msg);
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateType = exports.DateTypes = undefined;

var _valid = __webpack_require__(0);

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
/**
 * @Author sugo.io<asd>
 * @Date 17-10-18
 * @description 类型验证
 */

function creator(type) {
  return {
    type,
    msg: `Property [{{key}}] Type Error : Not ${type}`
  };
}

/** @type {Object<string, ValidTypeDesc>} */
const DateTypes = {
  // Primitive
  PRIM_BOOL: creator('Boolean'),
  PRIM_NUM: creator('Number'),
  PRIM_STR: creator('String'),
  PRIM_NL: creator('Null'),
  PRIM_UNDEF: creator('Undefined'),
  PRIM_SYMBOL: creator('Symbol'),

  // Object
  OBJ_O: creator('Object'),
  OBJ_A: creator('Array')

  /**
   * 生成验证装饰器函数
   * @param {ValidTypeDesc} ValidType
   * @param {string} [msg]
   * @return {ValidDecorate}
   */
};function DateType(ValidType, msg) {
  function validator(value, target) {
    return toString.call(value) === `[object ${ValidType.type}]`;
  }

  return (0, _valid.decorate)(validator, msg || ValidType.msg);
}

DateType.DateTypes = DateTypes;

exports.DateTypes = DateTypes;
exports.DateType = DateType;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Enum = undefined;

var _valid = __webpack_require__(0);

/**
 * @param {Object} enumData
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Enum(enumData, msg) {
  const values = Object.keys(enumData).map(key => enumData[key]);
  msg = msg || `Enum Type Error: {{key}} Must be one of ${values.join('')}`;

  function validator(value) {
    return values.includes(value);
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Enum;
exports.Enum = Enum;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxLen = undefined;

var _valid = __webpack_require__(0);

/**
 * 字符最大长度验证
 * @param {number} length
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function MaxLen(length, msg) {
  msg = msg || `{{key}}: Must be of type String that length less than ${length}`;

  function validator(value) {
    return typeof value === 'string' && value.length <= length;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = MaxLen;
exports.MaxLen = MaxLen;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinLen = undefined;

var _valid = __webpack_require__(0);

/**
 * 字符最小长度验证
 * @param {number} length
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function MinLen(length, msg) {
  msg = msg || `{{key}}: Must be of type String that length greater than ${length}`;

  function validator(value) {
    return typeof value === 'string' && value.length >= length;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = MinLen;
exports.MinLen = MinLen;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RangeLen = undefined;

var _valid = __webpack_require__(0);

/**
 * 字符长度取值区间验证
 * @param {Array<number>} range
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function RangeLen(range, msg) {
  msg = msg || `{{key}}: Must be of type String than length greater than ${range[0]} less than ${range[1]} `;

  function validator(value) {
    return typeof value === 'string' && value.length >= range[0] && value.length <= range[1];
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = RangeLen;
exports.RangeLen = RangeLen;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Max = undefined;

var _valid = __webpack_require__(0);

/**
 * 右边界验证
 * @param {number} num
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Max(num, msg) {
  msg = msg || `{{key}}: Must be of type umber and less than ${num}`;

  function validator(value) {
    return typeof value === 'number' && value <= num;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Max;
exports.Max = Max;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Min = undefined;

var _valid = __webpack_require__(0);

/**
 * 左边界验证
 * @param {number} num
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Min(num, msg) {
  msg = msg || `{{key}}: Must be of type umber and greater than ${num}`;

  function validator(value) {
    return typeof value === 'number' && value >= num;
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Min;
exports.Min = Min;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pattern = undefined;

var _valid = __webpack_require__(0);

/**
 * 正则匹配
 * @param {RegExp} pattern
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Pattern(pattern, msg) {
  msg = msg || `{{key}}: Not Matched Error`;

  function validator(value) {
    return pattern.test(value);
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Pattern;
exports.Pattern = Pattern;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = undefined;

var _valid = __webpack_require__(0);

/**
 * 数值取值验证
 * @param {Array<number>} range
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Range(range, msg) {
  msg = msg || `{{key}}: Must be of type number that greater than ${range[0]} less than ${range[1]} `;

  function validator(value) {
    return typeof value === 'number' && value >= range[0] && value <= range[1];
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Range;
exports.Range = Range;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Required = undefined;

var _valid = __webpack_require__(0);

/**
 * 必填验证：验证是否为undefined或空字符
 * @param {string} [msg]
 * @return {ValidDecorate}
 */
function Required(msg = '{{key}} is required') {
  function validator(value) {
    return value !== void 0 && value !== '';
  }

  return (0, _valid.decorate)(validator, msg);
} /**
   * @Author sugo.io<asd>
   * @Date 17-10-19
   */

exports.default = Required;
exports.Required = Required;

/***/ })
/******/ ]);