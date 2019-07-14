"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
var compatible_1 = require("../../../core/impl/compatible");
function Enum(enumData, msg) {
    var values = compatible_1.map(compatible_1.keys(enumData), function (key) { return enumData[key]; });
    msg = msg || "Enum Type Error: {{key}} Must be one of " + values.join('');
    function validator(value) {
        return compatible_1.includes(values, value);
    }
    return utils_1.wrap(validator, msg);
}
exports["default"] = Enum;
exports.Enum = Enum;
//# sourceMappingURL=enum.js.map