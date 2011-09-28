var EventEmitter;
var __slice = Array.prototype.slice;
EventEmitter = (function() {
  function EventEmitter() {
    this._events = {};
  }
  EventEmitter.prototype.on = function(name, callback) {
    var _base;
    (_base = this._events)[name] || (_base[name] = []);
    return this._events[name].push(callback);
  };
  EventEmitter.prototype.emit = function() {
    var args, callback, name, _i, _len, _ref, _results;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (this._events[name]) {
      _ref = this._events[name];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback(args));
      }
      return _results;
    }
  };
  return EventEmitter;
})();
exports.EventEmitter = EventEmitter;