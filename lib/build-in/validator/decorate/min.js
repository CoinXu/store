"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function Min(num, msg) {
    msg = msg || "{{key}}: Must be of type number and greater than " + num;
    function validator(value) {
        return typeof value === 'number' && value >= num;
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = Min;
exports.Min = Min;
//# sourceMappingURL=min.js.map