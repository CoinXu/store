"use strict";
exports.__esModule = true;
var utils_1 = require("../../../core/impl/utils");
var Validator_1 = require("./Validator");
function storeValidatorCreator(description, store) {
    if (process.env.NODE_ENV === "development") {
        utils_1.assert(utils_1.isObject(description), 'store validator descriptor must be type of string');
    }
    var namespace = description.namespace, model = description.model, scheduler = description.scheduler, map = description.map;
    if (process.env.NODE_ENV === "development") {
        utils_1.assert(utils_1.isString(namespace), 'desc.namespace must be type of string');
        utils_1.assert(utils_1.isFunction(scheduler), 'desc.namespace must be type of function');
        utils_1.assert(utils_1.isFunction(map), 'desc.map must be type of function');
        utils_1.assert(Validator_1.Validator.isValidator(model), 'desc.model must be instance of Validator class');
    }
    store.use(function (action, state, next) {
        scheduler(action, model, function () {
            next((_a = {}, _a[namespace] = map(model), _a));
            var _a;
        });
    });
    return store;
}
exports["default"] = storeValidatorCreator;
//# sourceMappingURL=index.js.map