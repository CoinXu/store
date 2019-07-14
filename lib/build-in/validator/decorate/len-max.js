"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function MaxLen(length, msg) {
    msg = msg || "{{key}}: Must be of type String that length less than " + length;
    function validator(value) {
        return typeof value === 'string' && value.length <= length;
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = MaxLen;
exports.MaxLen = MaxLen;
//# sourceMappingURL=len-max.js.map