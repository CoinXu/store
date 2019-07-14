"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function Required(msg) {
    if (msg === void 0) { msg = '{{key}} is required'; }
    function validator(value) {
        return value !== void 0 && value !== '';
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = Required;
exports.Required = Required;
//# sourceMappingURL=required.js.map