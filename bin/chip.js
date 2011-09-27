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
  function Chip(chip) {
    var func, name, pins, _ref, _ref2;
    this.chip = chip;
    this.inputs = {};
    _ref = this.chip.inputs;
    for (name in _ref) {
      pins = _ref[name];
      this.setInput(name, zeros(pins));
    }
    this.outputs = {};
    _ref2 = this.chip.outputs;
    for (name in _ref2) {
      func = _ref2[name];
      this.setOutput(name, func);
    }
  }
  Chip.prototype.setOutput = function(name, func) {
    return this.outputs[name] = __bind(function() {
      return func.call(this.inputs);
    }, this);
  };
  Chip.prototype.setInput = function(name, value) {
    return this.inputs[name] = typeof value === 'function' ? value : function() {
      return value;
    };
  };
  return Chip;
})();
exports.Chip = Chip;