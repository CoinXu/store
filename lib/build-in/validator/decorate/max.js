"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function Max(num, msg) {
    msg = msg || "{{key}}: Must be of type number and less than " + num;
    function validator(value) {
        return typeof value === 'number' && value <= num;
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = Max;
exports.Max = Max;
//# sourceMappingURL=max.js.map