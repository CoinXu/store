"use strict";
exports.__esModule = true;
var utils_1 = require("./utils");
function freeze(obj) {
    try {
        Object.freeze(obj);
    }
    catch (e) {
        utils_1.warning(true, e.message);
    }
    return obj;
}
exports.freeze = freeze;
function assign(object) {
    var otherArgs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        otherArgs[_i - 1] = arguments[_i];
    }
    if (!utils_1.isObject(object)) {
        return object;
    }
    var length = otherArgs.length;
    var i;
    var propKey;
    var tmp;
    for (i = 0; i < length; i++) {
        tmp = otherArgs[i];
        for (propKey in tmp) {
            if (tmp.hasOwnProperty(propKey)) {
                object[propKey] = tmp[propKey];
            }
        }
    }
    return object;
}
exports.assign = assign;
function find(arr, filter) {
    var length = arr.length;
    if (length === 0) {
        return undefined;
    }
    var result = undefined;
    for (var i = 0; i < length; i++) {
        if (filter(arr[i], i, arr)) {
            result = arr[i];
            break;
        }
    }
    return result;
}
exports.find = find;
function filter(arr, filter) {
    var result = [];
    var length = arr.length;
    if (length === 0) {
        return result;
    }
    for (var i = 0; i < length; i++) {
        if (filter(arr[i], i, arr)) {
            result.push(arr[i]);
        }
    }
    return result;
}
exports.filter = filter;
function every(arr, filter) {
    var length = arr.length;
    if (length === 0) {
        return true;
    }
    for (var i = 0; i < length; i++) {
        if (filter(arr[i], i, arr)) {
            return true;
        }
    }
    return false;
}
exports.every = every;
function some(arr, iterator) {
    var result = false;
    for (var i = 0, len = arr.length; i < len; i++) {
        if (iterator(arr[i], i, arr)) {
            result = true;
            break;
        }
    }
    return result;
}
exports.some = some;
function includes(arr, value) {
    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
        var v = arr_1[_i];
        if (v === value) {
            return true;
        }
    }
    return false;
}
exports.includes = includes;
function map(arr, iterator) {
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        result.push(iterator(arr[i], i, arr));
    }
    return result;
}
exports.map = map;
function keys(obj) {
    if (!utils_1.isObject(obj)) {
        return [];
    }
    var results = [];
    for (var propKey in obj) {
        if (obj.hasOwnProperty(propKey)) {
            results.push(propKey);
        }
    }
    return results;
}
exports.keys = keys;
//# sourceMappingURL=compatible.js.map