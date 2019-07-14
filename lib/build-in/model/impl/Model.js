"use strict";
exports.__esModule = true;
var utils_1 = require("../../../core/impl/utils");
var compatible_1 = require("../../../core/impl/compatible");
var Model = (function () {
    function Model(description) {
        var name = description.name, scheduler = description.scheduler, state = description.state;
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isString(name), 'name must be a string');
            utils_1.assert(utils_1.isFunction(scheduler), 'scheduler must be a function');
            utils_1.assert(utils_1.isPureObject(state), 'state must be a pure object');
        }
        this.name = name;
        this.scheduler = scheduler;
        this.state = compatible_1.assign({}, state);
    }
    Model.prototype.receiver = function (action, storeState, next) {
        var thiz = this;
        function done(state) {
            thiz.done(state, next);
        }
        var state = this.scheduler.call(this, this.state, action, done);
        if (utils_1.isPureObject(state))
            done(state);
        return this;
    };
    Model.prototype.done = function (state, next) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isPureObject(state), 'state must be a pure object');
        }
        compatible_1.assign(this.state, state);
        next((_a = {}, _a[this.name] = compatible_1.assign({}, this.state), _a));
        return this;
        var _a;
    };
    Model.isModel = function (ins) {
        return ins instanceof Model;
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map