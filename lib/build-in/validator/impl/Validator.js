"use strict";
exports.__esModule = true;
var ValidatorDefaultBuffer_1 = require("./ValidatorDefaultBuffer");
var utils_1 = require("./utils");
var compatible_1 = require("../../../core/impl/compatible");
var utils_2 = require("../../../core/impl/utils");
var hasOwnProperty = Object.prototype.hasOwnProperty;
var Validator = (function () {
    function Validator() {
        var _newTarget = this.constructor;
        this.__message__ = {};
        this.__validator__ = {};
        var proto = _newTarget.prototype;
        var valid;
        while (proto) {
            valid = ValidatorDefaultBuffer_1["default"].get(proto);
            if (valid !== null) {
                compatible_1.assign(this.__validator__, valid.validator);
            }
            proto = proto.__proto__;
        }
    }
    Validator.prototype.validator = function () {
        return this.__validator__;
    };
    Validator.prototype.validOne = function (key, value) {
        var validator = this.__validator__[key];
        if (validator === void 0) {
            return null;
        }
        var message = null;
        var length = validator.length;
        var i = 0;
        var vd;
        for (; i < length; i++) {
            vd = validator[i];
            if (!vd.validator(value)) {
                message = utils_1.template(vd.msg, { key: key });
                break;
            }
        }
        return message;
    };
    Validator.prototype.valid = function (values) {
        var message = {};
        for (var propKey in values) {
            if (!hasOwnProperty.call(values, propKey))
                continue;
            message[propKey] = this.validOne(propKey, values[propKey]);
        }
        return message;
    };
    Validator.prototype.getValid = function () {
        var result = {};
        var message = this.__message__;
        var has;
        for (var propKey in message) {
            if (!hasOwnProperty.call(message, propKey) || message[propKey] === null)
                continue;
            has = true;
            result[propKey] = message[propKey];
        }
        return has ? result : null;
    };
    Validator.prototype.set = function (valuesOrKey, valueOrUndef) {
        var _a;
        var values;
        if (utils_2.isObject(valuesOrKey)) {
            values = valuesOrKey;
        }
        else {
            values = (_a = {}, _a[valuesOrKey] = valueOrUndef, _a);
        }
        var message = this.valid(values);
        this.__message__ = compatible_1.assign(this.__message__, message);
        for (var propKey in values) {
            if (!hasOwnProperty.call(values, propKey))
                continue;
            if (message[propKey] !== null)
                continue;
            this[propKey] = values[propKey];
        }
        return message;
    };
    Validator.isValidator = function (ins) {
        return ins instanceof Validator;
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=Validator.js.map