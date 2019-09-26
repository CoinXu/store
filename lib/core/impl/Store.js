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
var AbstractStore_1 = require("./AbstractStore");
var utils_1 = require("./utils");
var compatible_1 = require("./compatible");
var combiner_1 = require("./combiner");
var InitializeAction = { type: '__INITIALIZE__ACTION__', payload: null };
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(state) {
        if (state === void 0) { state = {}; }
        var _this = _super.call(this) || this;
        _this.mw = [];
        _this.state = compatible_1.assign({}, state);
        _this.observer = [];
        return _this;
    }
    Store.prototype.initialize = function (action) {
        if (action === void 0) { action = InitializeAction; }
        return this.one(action);
    };
    Store.prototype.dispatch = function (action, callback) {
        if (utils_1.isPureObject(action)) {
            return this.one(action, callback);
        }
        if (utils_1.isArray(action)) {
            return this.group(action, callback);
        }
        return this;
    };
    Store.prototype.use = function (mw) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isFunction(mw), 'Middleware must be composed of functions');
        }
        this.mw.push(mw);
        return this;
    };
    Store.prototype.getState = function () {
        return compatible_1.assign({}, this.state);
    };
    Store.prototype.subscribe = function (observer) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isFunction(observer), 'observer must be a function');
        }
        this.observer.push(observer);
        return this;
    };
    Store.prototype.unsubscribe = function (observer) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isFunction(observer), 'observer must be a function');
        }
        this.observer = this.observer.filter(function (ob) { return ob !== observer; });
        return this;
    };
    Store.prototype._emit = function (state) {
        for (var _i = 0, _a = this.observer; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer(state);
        }
    };
    Store.prototype._dispatch = function (action, callback) {
        if (process.env.NODE_ENV === "development") {
            utils_1.warning(utils_1.isString(action.type), 'type of action must be a string');
        }
        var thiz = this;
        combiner_1["default"](this.mw)(action, thiz.state, function (result) {
            compatible_1.assign(thiz.state, result);
        }, function () {
            if (utils_1.isFunction(callback)) {
                callback(thiz.state);
            }
        });
        return this;
    };
    Store.prototype.one = function (action, callback) {
        var thiz = this;
        return this._dispatch(action, function (state) {
            thiz._emit(state);
            if (utils_1.isFunction(callback)) {
                callback(state);
            }
        });
    };
    Store.prototype.group = function (actions, callback) {
        if (process.env.NODE_ENV === "development") {
            compatible_1.some(actions, function (action) {
                utils_1.assert(utils_1.isPureObject(action), 'action must be a pure object');
                return false;
            });
        }
        var thiz = this;
        var mws = actions.map(function (action) {
            return function (a, s, next) {
                thiz._dispatch(action, function (state) {
                    next(state);
                });
            };
        });
        combiner_1["default"](mws)(null, null, utils_1.noop, function () {
            thiz._emit(thiz.state);
            if (utils_1.isFunction(callback)) {
                callback(thiz.state);
            }
        });
        return this;
    };
    return Store;
}(AbstractStore_1.AbstractStore));
exports.Store = Store;
//# sourceMappingURL=Store.js.map