var Chip, Clock, Connector, GrahpicChip, pathFormat;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Chip = require('chip').Chip;
Clock = require('clock').Clock;
$(function() {
  var a, c, clock, o, paper;
  window.pppaper = paper = Raphael('canvasarea', '100%', '100%').draggable.enable();
  clock = new Clock();
  a = new GrahpicChip(chips.and, clock);
  a.createSvg(paper, 50, 50);
  o = new GrahpicChip(chips.dFlipFlop, clock);
  o.createSvg(paper, 200, 50);
  c = new Connector(paper, {
    x: 300,
    y: 300
  });
  console.log(c);
  c.linkStart(a, 'out');
  return c.linkEnd(o, 'd');
});
Raphael.fn.hline = function(x, y, width) {
  return this.path("M" + x + " " + y + "L" + (x + width) + " " + y);
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
pathFormat = function(start, end) {
  return "M" + start.x + " " + start.y + "L" + end.x + " " + end.y;
};
Raphael.fn.connectors = {
  items: {},
  add: function() {}
};
Connector = (function() {
  function Connector(paper, start, link) {
    this.paper = paper;
    this.start = start;
    this.end = this.start;
    this.svg = this.paper.path(pathFormat(start, start));
  }
  Connector.prototype.update = function() {
    return this.svg.attr('path', pathFormat(this.start, this.end));
  };
  Connector.prototype.updateStart = function(start) {
    this.start = start;
    return this.update();
  };
  Connector.prototype.updateEnd = function(end) {
    this.end = end;
    return this.update();
  };
  Connector.prototype.link = function(type, obj, pin) {
    var link;
    link = obj.link[type];
    if (!link[pin]) {
      link[pin] = [];
    }
    if (link[pin].indexOf(this === -1)) {
      link[pin].push(this);
    }
    return obj.svg.set.draggable.onmovedrag();
  };
  Connector.prototype.linkStart = function(obj, pin) {
    return this.link('outputs', obj, pin);
  };
  Connector.prototype.linkEnd = function(obj, pin) {
    return this.link('inputs', obj, pin);
  };
  return Connector;
})();
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
    var all, allSet, element, height, i, input, inputSets, inputs, line, maxInputWidth, maxOutputWidth, maxPins, name, numInputs, numOutputs, output, outputSets, outputs, pinStart, rect, text, w, _i, _len;
    this.x = x;
    this.y = y;
    this.link = {
      inputs: {},
      outputs: {}
    };
    this.pinPos = {
      inputs: {},
      outputs: {}
    };
    pinStart = this.minHeight / 2;
    i = 0;
    inputs = [];
    inputSets = [];
    maxInputWidth = 0;
    for (input in this.inputs) {
      y = this.pinY(i++);
      line = paper.hline(this.x, y, 10);
      text = paper.textAlign(this.x + this.pinWidth + 3, y, input, 'left');
      this.pinPos.inputs[input] = y - this.y;
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
      this.pinPos.outputs[output] = y - this.y;
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
    this.width = name.getBBox().width + 2 * this.pinGap + 2 * 10 + maxInputWidth * 2 + maxOutputWidth * 2;
    rect.attr('width', this.width);
    name.attr('x', this.x + this.width / 2);
    for (_i = 0, _len = outputs.length; _i < _len; _i++) {
      output = outputs[_i];
      output.translate(this.width - this.minWidth, 0);
    }
    all = [rect, name].concat(inputs, outputs);
    allSet = paper.set().draggable.enable();
    allSet.push.apply(this, all);
    allSet.attr('cursor', 'move');
    allSet.draggable.onstartdrag = function() {
      return rect.animate({
        'fill-opacity': 0.2
      }, 500, '>');
    };
    allSet.draggable.onenddrag = function() {
      return rect.animate({
        'fill-opacity': 0.05
      }, 500, '>');
    };
    allSet.draggable.onmovedrag = __bind(function() {
      var connector, connectors, linkName, _j, _len2, _ref, _ref2, _results;
      this.x = rect.attr('x');
      this.y = rect.attr('y');
      _ref = this.link.inputs;
      for (linkName in _ref) {
        connectors = _ref[linkName];
        for (_j = 0, _len2 = connectors.length; _j < _len2; _j++) {
          connector = connectors[_j];
          connector.updateEnd({
            x: this.x,
            y: this.y + this.pinPos.inputs[linkName]
          });
        }
      }
      _ref2 = this.link.outputs;
      _results = [];
      for (linkName in _ref2) {
        connectors = _ref2[linkName];
        _results.push((function() {
          var _k, _len3, _results2;
          _results2 = [];
          for (_k = 0, _len3 = connectors.length; _k < _len3; _k++) {
            connector = connectors[_k];
            _results2.push(connector.updateStart({
              x: this.x + this.width,
              y: this.y + this.pinPos.outputs[linkName]
            }));
          }
          return _results2;
        }).call(this));
      }
      return _results;
    }, this);
    this.svg = {
      set: allSet,
      items: (function() {
        var _j, _len2, _results;
        _results = [];
        for (_j = 0, _len2 = all.length; _j < _len2; _j++) {
          element = all[_j];
          _results.push(element.node);
        }
        return _results;
      })()
    };
    return console.log(allSet);
  };
  return GrahpicChip;
})();