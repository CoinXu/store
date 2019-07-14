"use strict";
exports.__esModule = true;
var ValidatorDefaultBuffer_1 = require("./ValidatorDefaultBuffer");
function wrap(validator, msg) {
    function wrapper(value) {
        return value === null || validator(value);
    }
    return function (target, key, descriptor) {
        ValidatorDefaultBuffer_1["default"].add(target, key, wrapper, msg);
        return descriptor;
    };
}
exports.wrap = wrap;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function template(temp, values) {
    for (var propKey in values) {
        if (!hasOwnProperty.call(values, propKey))
            continue;
        temp = temp.replace(new RegExp("{{s*" + propKey + "s*}}", 'g'), values[propKey]);
    }
    return temp;
}
exports.template = template;
//# sourceMappingURL=utils.js.map