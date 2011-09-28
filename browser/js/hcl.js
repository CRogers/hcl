var exports = {};
var modules = {};
var requiredCache = {};
var chips = {};

function require(name){
	if(!requiredCache[name]){
		modules[name].call(window);
		requiredCache[name] = true;
	}
	return exports[name];
}
chips['and'] = ({
  name: 'and',
  description: 'Takes two inputs and applies the boolean AND operation',
  generics: {
    x: 1
  },
  inputs: {
    a: 'x',
    b: 'x'
  },
  outputs: {
    out: function() {
      var a, b, i, _ref, _results;
      a = this.inputs.a();
      b = this.inputs.b();
      _results = [];
      for (i = 0, _ref = this.generics.x; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _results.push(a[i] && b[i]);
      }
      return _results;
    }
  }
});
;
chips['dFlipFlop'] = ({
  name: 'dFlipFlop',
  description: 'Saves 1 bit of state from the last clock tick',
  generics: {
    x: 1
  },
  inputs: {
    d: 'x'
  },
  outputs: {
    q: function() {
      return this.state.data;
    }
  },
  onTick: function() {
    return this.state.data = this.inputs.d();
  },
  state: {
    data: function() {
      var i, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.generics.x; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _results.push(false);
      }
      return _results;
    }
  }
});
;
chips['or'] = ({
  name: 'or',
  description: 'Takes two inputs and applies the boolean OR operation',
  generics: {
    x: 1
  },
  inputs: {
    a: 'x',
    b: 'x'
  },
  outputs: {
    out: function() {
      var a, b, i, _ref, _results;
      a = this.inputs.a();
      b = this.inputs.b();
      _results = [];
      for (i = 0, _ref = this.generics.x; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        _results.push(a[i] || b[i]);
      }
      return _results;
    }
  }
});
;
modules['chip'] = (function(){

	var exports = exports['chip'] = {}

	var Chip, ones, zeros;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
zeros = function(size) {
  var x, _results;
  _results = [];
  for (x = 0; 0 <= size ? x < size : x > size; 0 <= size ? x++ : x--) {
    _results.push(false);
  }
  return _results;
};
ones = function(size) {
  var x, _results;
  _results = [];
  for (x = 0; 0 <= size ? x < size : x > size; 0 <= size ? x++ : x--) {
    _results.push(true);
  }
  return _results;
};
Chip = (function() {
  var lastCalc;
  lastCalc = -1;
  function Chip(chip, clock, generics) {
    var func, name, pins, value, _base, _ref, _ref2, _ref3;
    this.chip = chip;
    this.clock = clock;
    this.generics = generics;
    this.inputs = {};
    this.outputs = {};
    this.state = {};
    this.generics || (this.generics = {});
    for (name in this.chip.generics) {
      (_base = this.generics)[name] || (_base[name] = this.chip.generics[name]);
    }
    this.internal = {
      inputs: this.inputs,
      state: this.state,
      generics: this.generics
    };
    _ref = this.chip.inputs;
    for (name in _ref) {
      pins = _ref[name];
      if (typeof pins === 'string') {
        pins = this.generics[pins];
      }
      this.setInput(name, zeros(pins));
    }
    _ref2 = this.chip.outputs;
    for (name in _ref2) {
      func = _ref2[name];
      this.setOutput(name, func);
    }
    _ref3 = this.chip.state;
    for (name in _ref3) {
      value = _ref3[name];
      this.setState(name, value.call(this.internal));
    }
    if (this.chip.onTick) {
      this.clock.on('tick', __bind(function() {
        return this.chip.onTick.call(this.internal);
      }, this));
    }
    console.log(this);
  }
  Chip.prototype.setOutput = function(name, func) {
    return this.outputs[name] = __bind(function() {
      if (lastCalc < this.clock.time()) {
        return func.call(this.internal);
      }
    }, this);
  };
  Chip.prototype.setInput = function(name, value) {
    this.inputs[name] = typeof value === 'function' ? value : function() {
      return value;
    };
    return lastCalc = -1;
  };
  Chip.prototype.setState = function(name, value) {
    return this.state[name] = value;
  };
  return Chip;
})();
exports.Chip = Chip;

});
modules['clock'] = (function(){

	var exports = exports['clock'] = {}

	var Clock, EventEmitter;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
EventEmitter = require('events').EventEmitter;
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
    return time;
  };
  return Clock;
})();
exports.Clock = Clock;

});
