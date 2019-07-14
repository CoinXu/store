"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function Pattern(pattern, msg) {
    msg = msg || "{{key}}: Not Matched " + pattern.toString();
    function validator(value) {
        return pattern.test(value);
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = Pattern;
exports.Pattern = Pattern;
//# sourceMappingURL=pattern.js.map