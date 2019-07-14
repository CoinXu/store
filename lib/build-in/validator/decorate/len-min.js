"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function MinLen(length, msg) {
    msg = msg || "{{key}}: Must be of type String that length greater than " + length;
    function validator(value) {
        return typeof value === 'string' && value.length >= length;
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = MinLen;
exports.MinLen = MinLen;
//# sourceMappingURL=len-min.js.map