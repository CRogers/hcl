var Clock, EventEmitter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
EventEmitter = require('./events').EventEmitter;
Clock = (function() {
  var time;
  __extends(Clock, EventEmitter);
  function Clock() {
    Clock.__super__.constructor.apply(this, arguments);
  }
  time = 0;
  Clock.prototype.time = function() {
    return time;
  };
  Clock.prototype.advance = function() {
    this.emit('tick', ++time);
    return ++time;
  };
  return Clock;
})();
exports.Clock = Clock;