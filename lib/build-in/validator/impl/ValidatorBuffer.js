"use strict";
exports.__esModule = true;
var compatible_1 = require("../../../core/impl/compatible");
var ValidatorBuffer = (function () {
    function ValidatorBuffer() {
        this.buffer = [];
    }
    ValidatorBuffer.prototype.add = function (target, key, validator, msg) {
        var buf = compatible_1.find(this.buffer, function (buf) { return buf.target === target; });
        if (buf) {
            var arr = buf.validator[key] || (buf.validator[key] = []);
            arr.push({ msg: msg, validator: validator });
            return this;
        }
        this.buffer.push({
            target: target,
            validator: (_a = {},
                _a[key] = [{ msg: msg, validator: validator }],
                _a)
        });
        return this;
        var _a;
    };
    ValidatorBuffer.prototype.get = function (target) {
        return compatible_1.find(this.buffer, function (buf) { return buf.target === target; }) || null;
    };
    ValidatorBuffer.prototype.destroy = function (target) {
        this.buffer = compatible_1.filter(this.buffer, function (buf) { return buf.target !== target; });
        return this;
    };
    return ValidatorBuffer;
}());
exports.ValidatorBuffer = ValidatorBuffer;
//# sourceMappingURL=ValidatorBuffer.js.map