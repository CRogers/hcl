var Chip, Clock, GrahpicChip, danimate, rscale, setPushArr;
var __slice = Array.prototype.slice, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Chip = require('chip').Chip;
Clock = require('clock').Clock;
$(function() {
  var a, clock, o, paper;
  paper = Raphael('canvasarea', '100%', '100%').draggable.enable();
  clock = new Clock();
  a = new GrahpicChip(chips.and, clock);
  a.createSvg(paper, 50, 50);
  o = new GrahpicChip(chips.dFlipFlop, clock);
  return o.createSvg(paper, 200, 50);
});
Raphael.fn.hline = function(x, y, width) {
  return this.path("M" + x + " " + y + "L" + (x + width) + " " + y);
};
danimate = function(obj, attrs, time, type) {
  var k, newAttrs, v;
  newAttrs = {};
  for (k in attrs) {
    v = attrs[k];
    newAttrs[k] = obj.attr(k) + v;
  }
  return obj.animate(newAttrs, time, type);
};
rscale = function(rect, d, time, type) {
  return danimate(rect, {
    x: -d,
    y: -d,
    width: 2 * d,
    height: 2 * d
  }, time, type);
};
setPushArr = function() {
  var arr, arrs, set, _i, _len, _results;
  set = arguments[0], arrs = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  _results = [];
  for (_i = 0, _len = arrs.length; _i < _len; _i++) {
    arr = arrs[_i];
    _results.push(set.push.apply(this, arr));
  }
  return _results;
};
Raphael.fn.textAlign = function(x, y, str, halign, valign) {
  var bb, dh, dw, text;
  if (halign == null) {
    halign = 'center';
  }
  if (valign == null) {
    valign = 'center';
  }
  text = this.text(x, y, str);
  bb = text.getBBox();
  dw = bb.width / 2;
  dh = bb.height / 2;
  switch (halign) {
    case 'left':
      text.attr('x', x + dw);
      break;
    case 'right':
      text.attr('x', x - dw);
  }
  switch (valign) {
    case 'top':
      text.attr('y', y + dh);
      break;
    case 'bottom':
      text.attr('y', y - dh);
  }
  return text;
};
GrahpicChip = (function() {
  __extends(GrahpicChip, Chip);
  function GrahpicChip() {
    GrahpicChip.__super__.constructor.apply(this, arguments);
  }
  GrahpicChip.prototype.minWidth = 70;
  GrahpicChip.prototype.minHeight = 40;
  GrahpicChip.prototype.pinWidth = 10;
  GrahpicChip.prototype.pinGap = 10;
  GrahpicChip.prototype.pinY = function(i) {
    return this.y + this.minHeight / 2 + i * 10;
  };
  GrahpicChip.prototype.createSvg = function(paper, x, y) {
    var all, height, i, input, inputSets, inputs, line, maxInputWidth, maxOutputWidth, maxPins, name, numInputs, numOutputs, output, outputSets, outputs, pinStart, rect, text, w, width, _i, _len;
    this.x = x;
    this.y = y;
    pinStart = this.minHeight / 2;
    i = 0;
    inputs = [];
    inputSets = [];
    maxInputWidth = 0;
    for (input in this.inputs) {
      y = this.pinY(i++);
      line = paper.hline(this.x, y, 10);
      text = paper.textAlign(this.x + this.pinWidth + 3, y, input, 'left');
      if ((w = text.getBBox().width) > maxInputWidth) {
        maxInputWidth = w;
      }
      inputs.push(line, text);
      inputSets.push(paper.set(line, text));
    }
    numInputs = i;
    i = 0;
    outputs = [];
    outputSets = [];
    maxOutputWidth = 0;
    for (output in this.outputs) {
      y = this.pinY(i++);
      line = paper.hline(this.x + this.minWidth, y, -10);
      text = paper.textAlign(this.x + this.minWidth - this.pinGap - 3, y, output, 'right');
      if ((w = text.getBBox().width) > maxOutputWidth) {
        maxOutputWidth = w;
      }
      outputs.push(line, text);
      outputSets.push(paper.set(line, text));
    }
    numOutputs = i;
    maxPins = Math.max(numInputs, numOutputs);
    height = this.minHeight + (maxPins - 1) * this.pinGap;
    rect = paper.rect(this.x, this.y, this.minWidth, height, 15).attr({
      fill: this.chip.color,
      'fill-opacity': 0.05,
      stroke: this.chip.color,
      'stroke-width': 2
    });
    name = paper.text(this.x + this.minWidth / 2, this.y + 15, this.chip.name).attr({
      'font-size': 12,
      'fill': 'white'
    });
    width = name.getBBox().width + 2 * this.pinGap + 2 * 10 + maxInputWidth * 2 + maxOutputWidth * 2;
    rect.attr('width', width);
    name.attr('x', this.x + width / 2);
    for (_i = 0, _len = outputs.length; _i < _len; _i++) {
      output = outputs[_i];
      output.translate(width - this.minWidth, 0);
    }
    all = paper.set().draggable.enable();
    all.push(rect, name);
    setPushArr(all, inputs, outputs);
    all.attr('cursor', 'move');
    all.draggable.onstartdrag = function() {
      return rect.animate({
        'fill-opacity': 0.2
      }, 500, '>');
    };
    return all.draggable.onenddrag = function() {
      return rect.animate({
        'fill-opacity': 0.05
      }, 500, '>');
    };
  };
  return GrahpicChip;
})();