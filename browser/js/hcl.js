var exportsObj = {};
var modules = {};
var requiredCache = {};
var chips = {};

function require(name){
	
	name = name.replace(/.*?\//g,'').replace('.js','');
	
	if(!modules[name]){
		return undefined;
	}
	
	if(!requiredCache[name]){
		modules[name].call(this);
		requiredCache[name] = true;
	}
	
	return exportsObj[name];
}

chips['and'] = ({
  name: 'and',
  description: 'Takes two inputs and applies the boolean AND operation',
  color: 'red',
  inputs: {
    a: 1,
    b: 1
  },
  outputs: {
    out: function() {
      return [this.inputs.a()[0] && this.inputs.b()[0]];
    }
  }
});
;
chips['dFlipFlop'] = ({
  name: 'dFlipFlop',
  description: 'Saves 1 bit of state from the last clock tick',
  color: 'blue',
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
chips['joiner'] = ({
  name: 'joiner',
  description: 'Joins 2 smaller buses into one larger bus',
  color: 'blue',
  generics: {
    aw: 8,
    bw: 8
  },
  inputs: {
    a: 'aw',
    b: 'bw'
  },
  outputs: {
    out: function() {
      return this.inputs.a().concat(this.inputs.b());
    }
  }
});
;
chips['or'] = ({
  name: 'or',
  description: 'Takes two inputs and applies the boolean OR operation',
  color: 'orange',
  inputs: {
    a: 1,
    b: 1
  },
  outputs: {
    out: function() {
      return [this.inputs.a()[0] || this.inputs.b()[0]];
    }
  }
});
;
chips['splitter'] = ({
  name: 'splitter',
  description: 'Slices up a bus into smaller buses',
  color: 'teal',
  generics: {
    start: 2,
    end: 4,
    width: 8
  },
  inputs: {
    bus: 'width'
  },
  outputs: {
    low: function() {
      return this.inputs.bus().slice(0, this.generics.start);
    },
    mid: function() {
      return this.inputs.bus().slice(this.generics.start, (this.generics.end + 1) || 9e9);
    },
    high: function() {
      return this.inputs.bus().slice(this.generics.end + 1, this.generics.width);
    }
  }
});
;
modules['chip'] = function(){

	var exports = exportsObj['chip'] = {};

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
  var internal, lastCalc, outputCache;
  lastCalc = -1;
  internal = void 0;
  outputCache = {};
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
    internal = {
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
      this.setState(name, value.call(internal));
    }
    if (this.chip.onTick) {
      this.clock.on('tick', __bind(function() {
        return this.chip.onTick.call(internal);
      }, this));
    }
  }
  Chip.prototype.setOutput = function(name, func) {
    return this.outputs[name] = __bind(function() {
      if (lastCalc < this.clock.time()) {
        lastCalc = this.clock.time();
        return outputCache[name] = func.call(internal);
      } else {
        return outputCache[name];
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

}
modules['clock'] = function(){

	var exports = exportsObj['clock'] = {};

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

}
modules['events'] = function(){

	var exports = exportsObj['events'] = {};

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

}
