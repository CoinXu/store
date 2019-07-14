"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Model_1 = require("../../model/impl/Model");
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(description, store) {
        var _this = _super.call(this, description) || this;
        _this.store = store;
        return _this;
    }
    ViewModel.isViewModel = function (ins) {
        return ins instanceof ViewModel;
    };
    return ViewModel;
}(Model_1.Model));
exports.ViewModel = ViewModel;
//# sourceMappingURL=ViewModel.js.map