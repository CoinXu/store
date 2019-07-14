"use strict";
exports.__esModule = true;
var ViewModel_1 = require("./ViewModel");
var compatible_1 = require("../../../core/impl/compatible");
function storeViewModelCreator(mods, store) {
    var vms = compatible_1.map(mods, function (m) {
        return ViewModel_1.ViewModel.isViewModel(m) ? m : new ViewModel_1.ViewModel(m, store);
    });
    compatible_1.map(vms, function (vm) {
        store.use(function (action, state, next) {
            vm.receiver(action, state, next);
        });
    });
    return store;
}
exports["default"] = storeViewModelCreator;
//# sourceMappingURL=index.js.map