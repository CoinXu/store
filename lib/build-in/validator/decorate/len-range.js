"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function RangeLen(min, max, msg) {
    msg = msg || "{{key}}: Must be of type String than length greater than " + min + " less than " + max;
    function validator(value) {
        return typeof value === 'string' && value.length >= min && value.length <= max;
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = RangeLen;
exports.RangeLen = RangeLen;
//# sourceMappingURL=len-range.js.map