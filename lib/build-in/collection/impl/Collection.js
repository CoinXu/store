"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var utils_1 = require("../../../core/impl/utils");
var compatible_1 = require("../../../core/impl/compatible");
var counter = 0;
function generate() {
    return "STORE_COLLECTION_PRIMARY_KEY_" + counter++;
}
var Collection = (function () {
    function Collection(primaryKey, mods) {
        if (mods === void 0) { mods = []; }
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(!utils_1.isString(primaryKey) || !!primaryKey, "Primary key must be a string and required");
        }
        this.primaryKey = primaryKey;
        this.reset(mods);
    }
    Collection.prototype.reset = function (mods) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isArray(mods), "Models must be a Array");
        }
        var map = {};
        var primaryKey = this.primaryKey;
        mods.forEach(function (mod) {
            if (process.env.NODE_ENV === "development") {
                utils_1.assert(utils_1.isObject(mod), "Each model muse be a object");
            }
            map[mod[primaryKey]] = mod;
        });
        this.cache = map;
        this.models = mods;
        this.toDel = {};
        this.toUpdate = {};
        this.toCreate = {};
        return this;
    };
    Collection.prototype.remove = function (keyOrMod) {
        var _this = this;
        var notPrimaryKey = utils_1.isObject(keyOrMod);
        var primaryKey = utils_1.isObject(keyOrMod)
            ? keyOrMod[this.primaryKey]
            : keyOrMod;
        this.models = this.models.filter(function (m) {
            return notPrimaryKey ? m !== keyOrMod : m[_this.primaryKey] !== keyOrMod;
        });
        this.toDel[primaryKey] = true;
        this.toCreate[primaryKey] = false;
        this.toUpdate[primaryKey] = false;
        return this;
    };
    Collection.prototype.update = function (primaryValue, props) {
        var _this = this;
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isString(primaryValue) || utils_1.isNumber(primaryValue), "Primary value must be String or Number instance");
            utils_1.assert(utils_1.isObject(props), "Props must be a Object");
        }
        this.models = this.models.map(function (m) {
            return m[_this.primaryKey] === primaryValue
                ? __assign({}, m, props)
                : m;
        });
        if (!this.toCreate[primaryValue]) {
            this.toUpdate[primaryValue] = true;
        }
        return this;
    };
    Collection.prototype.add = function (mod) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isObject(mod), "Model must be a Object");
        }
        if (mod[this.primaryKey] === void 0) {
            mod[this.primaryKey] = generate();
        }
        this.models = this.models.concat(mod);
        this.toCreate[mod[this.primaryKey]] = true;
        return this;
    };
    Collection.prototype.sort = function (compare) {
        if (process.env.NODE_ENV === "development") {
            utils_1.assert(utils_1.isFunction(compare), "Compare must be a Function instance");
        }
        this.models = this.models.sort(compare);
        return this;
    };
    Collection.prototype.at = function (index) {
        return this.models[index] || null;
    };
    Collection.prototype.last = function () {
        return this.models[this.models.length - 1];
    };
    Collection.prototype.find = function (filter) {
        utils_1.assert(utils_1.isObject(filter), "Filter must be a Object");
        var FilterKeys = compatible_1.keys(filter);
        if (FilterKeys.length === 0) {
            return null;
        }
        return (compatible_1.find(this.models, function (mod) { return compatible_1.every(FilterKeys, function (k) { return filter[k] === mod[k]; }); }) ||
            null);
    };
    Collection.prototype.get = function () {
        return this.models.slice();
    };
    Collection.prototype.toJSON = function () {
        var toDelete = [];
        var toUpdate = [];
        var toCreate = [];
        var md = this.toDel;
        var mu = this.toUpdate;
        var mc = this.toCreate;
        var primaryKey = this.primaryKey;
        var cache = this.cache;
        var key = null;
        this.models.forEach(function (m) {
            key = m[primaryKey];
            if (mu[key]) {
                toUpdate.push(m);
            }
            if (mc[key]) {
                toCreate.push(m);
            }
        });
        for (var key_1 in md) {
            if (md[key_1] && cache[key_1]) {
                toDelete.push(cache[key_1]);
            }
        }
        return {
            models: this.models.slice(),
            toDelete: toDelete,
            toUpdate: toUpdate,
            toCreate: toCreate
        };
    };
    Collection.prototype.toString = function () {
        return "[object StoreCollection]";
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map