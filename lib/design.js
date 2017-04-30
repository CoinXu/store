'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created on 28/04/2017.
 */

var AbstractObservable = function () {
  function AbstractObservable() {
    _classCallCheck(this, AbstractObservable);
  }

  _createClass(AbstractObservable, [{
    key: 'onNext',
    value: function onNext() {}
  }, {
    key: 'onError',
    value: function onError() {}
  }, {
    key: 'subscribe',
    value: function subscribe(observer) {}
  }]);

  return AbstractObservable;
}();

var AbstractObserver = function () {
  function AbstractObserver(onNext, onError) {
    _classCallCheck(this, AbstractObserver);
  }

  _createClass(AbstractObserver, [{
    key: 'onNext',
    value: function onNext() {}
  }, {
    key: 'onError',
    value: function onError() {}
  }]);

  return AbstractObserver;
}();

var AbstractStore = function (_AbstractObservable) {
  _inherits(AbstractStore, _AbstractObservable);

  function AbstractStore() {
    _classCallCheck(this, AbstractStore);

    return _possibleConstructorReturn(this, (AbstractStore.__proto__ || Object.getPrototypeOf(AbstractStore)).apply(this, arguments));
  }

  _createClass(AbstractStore, [{
    key: 'store',
    value: function store(model) {}
  }, {
    key: 'unstore',
    value: function unstore(name) {}
  }, {
    key: 'model',
    value: function model(props) {}
  }, {
    key: 'dispatch',
    value: function dispatch(action) {}
  }]);

  return AbstractStore;
}(AbstractObservable);

var AbstractModel = function () {
  function AbstractModel(_ref) {
    var name = _ref.name,
        state = _ref.state,
        _ref$actions = _ref.actions,
        actions = _ref$actions === undefined ? {} : _ref$actions,
        _ref$processor = _ref.processor,
        processor = _ref$processor === undefined ? function () {} : _ref$processor;

    _classCallCheck(this, AbstractModel);
  }

  _createClass(AbstractModel, [{
    key: 'done',
    value: function done(next) {}
  }, {
    key: 'reducer',
    value: function reducer(next) {}
  }]);

  return AbstractModel;
}();

var s = new AbstractStore();
s.dispatch({ type: '' });