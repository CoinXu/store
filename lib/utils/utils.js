'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created on 28/04/2017.
 */

function noop() {}

function isType(type) {
  return function (v) {
    return Object.prototype.toString.call(v) === '[object ' + type + ']';
  };
}

var isFunction = isType('Function');
var isObject = isType('Object');
var isUndefined = isType('Undefined');
var isString = isType('String');
var isArray = isType('Array');

var getPrototypeOf = Object.getPrototypeOf || function (obj) {
  return obj.__proto__;
};

function isPureObject(v) {
  if (!isObject(v)) return false;
  var prop = getPrototypeOf(v);
  if (prop === null) return true;

  var Ctor = prop.hasOwnProperty('constructor') && prop.constructor;
  return isFunction(Ctor) && Ctor === Object;
}

function warning(expected, message) {
  if (!expected && !isUndefined(console) && isFunction(console.error)) {
    console.error(message);
  }
}

function assert(expected, message) {
  if (!expected) {
    throw new Error(message);
  }
}

exports.noop = noop;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isString = isString;
exports.isUndefined = isUndefined;
exports.isArray = isArray;
exports.isPureObject = isPureObject;
exports.warning = warning;
exports.assert = assert;