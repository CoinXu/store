"use strict";
exports.__esModule = true;
var ObjectProp = Object.prototype;
function noop() {
}
exports.noop = noop;
function isFunction(value) {
    return ObjectProp.toString.call(value) === "[object Function]";
}
exports.isFunction = isFunction;
function isObject(value) {
    return ObjectProp.toString.call(value) === "[object Object]";
}
exports.isObject = isObject;
function isArray(value) {
    return ObjectProp.toString.call(value) === "[object Array]";
}
exports.isArray = isArray;
function isUndefined(value) {
    return ObjectProp.toString.call(value) === "[object Undefined]";
}
exports.isUndefined = isUndefined;
function isString(value) {
    return ObjectProp.toString.call(value) === "[object String]";
}
exports.isString = isString;
function isNumber(value) {
    return ObjectProp.toString.call(value) === "[object Number]";
}
exports.isNumber = isNumber;
exports.getPrototypeOf = Object.getPrototypeOf || function (obj) {
    return obj.__proto__;
};
function isPureObject(value) {
    if (!isObject(value)) {
        return false;
    }
    var prop = exports.getPrototypeOf(value);
    if (prop === null) {
        return true;
    }
    var Ctor = prop.hasOwnProperty('constructor') && prop.constructor;
    return isFunction(Ctor) && Ctor === Object;
}
exports.isPureObject = isPureObject;
var warn = isObject(console) && isFunction(console.warn) ? function (message) {
    console.warn(message);
} : noop;
function warning(expected, message) {
    if (!expected) {
        warn(message);
    }
}
exports.warning = warning;
function assert(expected, message) {
    if (!expected) {
        throw new Error(message);
    }
}
exports.assert = assert;
//# sourceMappingURL=utils.js.map