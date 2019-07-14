"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function Range(min, max, msg) {
    msg = msg || "{{key}}: Must be of type number that greater than " + min + " less than " + max + " ";
    function validator(value) {
        return typeof value === 'number' && value >= min && value <= max;
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = Range;
exports.Range = Range;
//# sourceMappingURL=range.js.map