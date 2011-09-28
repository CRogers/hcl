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
    var func, name, pins, value, _base, _ref, _ref2, _ref3, _ref4, _ref5;
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
        pins = (_ref2 = (_ref3 = this.generics) != null ? _ref3[pins] : void 0) != null ? _ref2 : this.chip.generics[pins];
      }
      this.setInput(name, zeros(pins));
    }
    _ref4 = this.chip.outputs;
    for (name in _ref4) {
      func = _ref4[name];
      this.setOutput(name, func);
    }
    _ref5 = this.chip.state;
    for (name in _ref5) {
      value = _ref5[name];
      this.setState(name, value.call(this.internal));
    }
    if (this.chip.onTick) {
      this.clock.on('tick', __bind(function() {
        return this.chip.onTick.call(this.internal);
      }, this));
    }
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