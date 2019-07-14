"use strict";
exports.__esModule = true;
var Model_1 = require("./Model");
var compatible_1 = require("../../../core/impl/compatible");
function storeModelCreator(mods, store) {
    var models = compatible_1.map(mods, function (m) {
        return Model_1.Model.isModel(m) ? m : new Model_1.Model(m);
    });
    compatible_1.map(models, function (mod) {
        store.use(function (action, state, next) {
            mod.receiver(action, state, next);
        });
    });
    return store;
}
exports["default"] = storeModelCreator;
//# sourceMappingURL=index.js.map