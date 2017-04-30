'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created on 28/04/2017.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _utils = require('./utils/utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Observable = function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this.observer = _utils.noop;
  }

  _createClass(Observable, [{
    key: 'onNext',
    value: function onNext(data) {
      this.observer(data);
      return this;
    }
  }, {
    key: 'subscribe',
    value: function subscribe(observer) {
      (0, _utils.assert)((0, _utils.isFunction)(observer), 'observer must be a function');
      this.observer = observer;
      return this;
    }
  }]);

  return Observable;
}();

exports.default = Observable;