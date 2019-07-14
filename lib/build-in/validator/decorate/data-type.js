"use strict";
exports.__esModule = true;
var utils_1 = require("../impl/utils");
function creator(type) {
    return "Property [{{key}}] Type Error : Not " + type;
}
var DataTypes;
(function (DataTypes) {
    DataTypes["PRIM_BOOL"] = "Boolean";
    DataTypes["PRIM_NUM"] = "Number";
    DataTypes["PRIM_STR"] = "String";
    DataTypes["PRIM_NL"] = "Null";
    DataTypes["PRIM_UNDEF"] = "Undefined";
    DataTypes["PRIM_SYMBOL"] = "Symbol";
    DataTypes["OBJ_O"] = "Object";
    DataTypes["OBJ_A"] = "Array";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
var ObjectToString = Object.prototype.toString;
function DataType(type, msg) {
    function validator(value) {
        return ObjectToString.call(value) === "[object " + type + "]";
    }
    return utils_1.wrap(validator, msg || creator(msg));
}
exports["default"] = DataType;
exports.DataType = DataType;
//# sourceMappingURL=data-type.js.map