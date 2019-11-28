"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Collection_1 = require("./Collection");
var utils_1 = require("../../../core/impl/utils");
var compatible_1 = require("../../../core/impl/compatible");
function default_1(description, store) {
    var collection = new Collection_1.Collection(description.primaryKey);
    var state = __assign({ list: collection.get() }, (description.state || {}));
    store.use((function (action, storeState, next) {
        description.scheduler.call(store, action, collection, function (props) {
            var _a;
            state.list = collection.get();
            if (utils_1.isObject(props)) {
                if (process.env.NODE_ENV === "development") {
                    utils_1.assert(props.list === void 0, "Props can not have a key which named [list]");
                }
                compatible_1.assign(state, props);
            }
            next((_a = {}, _a[description.name] = state, _a));
        });
    }));
    return store;
}
exports["default"] = default_1;
//# sourceMappingURL=index.js.map