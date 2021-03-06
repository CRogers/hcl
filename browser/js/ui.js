var Chip, Clock, Connector, GrahpicChip, align, connectorStart, pathFormat, uiMode;
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
uiMode = 'normal';
connectorStart = null;
$(function() {
  var a, c, clock, o, paper;
  window.pppaper = paper = Raphael('canvasarea', '100%', '100%').draggable.enable();
  clock = new Clock();
  a = new GrahpicChip(chips.and, clock);
  a.createSvg(paper, 50, 50);
  o = new GrahpicChip(chips.dFlipFlop, clock);
  o.createSvg(paper, 200, 50);
  return c = new Connector(paper, {
    chip: a,
    pin: 'out'
  }, {
    chip: o,
    pin: 'd'
  });
});
Raphael.fn.hline = function(x, y, width) {
  return this.path("M" + x + " " + y + "L" + (x + width) + " " + y);
};
Raphael.fn.textAlign = function(x, y, str, halign, valign) {
  if (halign == null) {
    halign = 'center';
  }
  if (valign == null) {
    valign = 'center';
  }
  return align(this.text(x, y, str), halign, valign);
};
align = function(obj, halign, valign) {
  var bb, dh, dw;
  if (halign == null) {
    halign = 'center';
  }
  if (valign == null) {
    valign = 'center';
  }
  bb = obj.getBBox();
  dw = bb.width / 2;
  dh = bb.height / 2;
  switch (halign) {
    case 'left':
      obj.attr('x', obj.attr('x') + dw);
      break;
    case 'right':
      obj.attr('x', obj.attr('x') - dw);
  }
  switch (valign) {
    case 'top':
      obj.attr('y', obj.attr('y') + dh);
      break;
    case 'bottom':
      obj.attr('y', obj.attr('y') - dh);
  }
  return obj;
};
pathFormat = function(start, end) {
  return "M" + start.x + " " + start.y + "L" + end.x + " " + end.y;
};
Raphael.fn.connectors = {
  items: {},
  add: function() {}
};
Connector = (function() {
  function Connector(paper, startLink, endLink) {
    this.paper = paper;
    this.startLink = startLink;
    this.endLink = endLink;
    this.start = this.end = {
      x: 0,
      y: 0
    };
    this.svg = this.paper.path(pathFormat(this.start, this.end));
    this.linkStart(this.startLink);
    this.linkEnd(this.endLink);
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
  Connector.prototype.linkStart = function(startLink, noUpdate) {
    var link, pin;
    this.startLink = startLink;
    pin = this.startLink.pin;
    link = this.startLink.chip.link.outputs;
    if (!link[pin]) {
      link[pin] = [];
    }
    if (link[pin].indexOf(this === -1)) {
      link[pin].push(this);
    }
    if (!noUpdate) {
      return this.startLink.chip.svg.set.draggable.onmovedrag();
    }
  };
  Connector.prototype.linkEnd = function(endLink, noUpdate) {
    var link, pin;
    this.endLink = endLink;
    pin = this.endLink.pin;
    link = this.endLink.chip.link.inputs;
    if (link[pin] && link[pin] !== this) {
      link[pin].unlink();
    }
    link[pin] = this;
    if (!noUpdate) {
      return this.endLink.chip.svg.set.draggable.onmovedrag();
    }
  };
  Connector.prototype.unlink = function() {
    this.unlinkStart();
    this.unlinkEnd();
    return this.svg.remove();
  };
  Connector.prototype.unlinkStart = function() {
    var index, link, pin;
    link = this.startLink.chip.link.outputs;
    pin = this.startLink.pin;
    if (link[pin]) {
      index = link[pin].indexOf(this);
      if (index !== -1) {
        return link[pin].splice(index, 1);
      }
    }
  };
  Connector.prototype.unlinkEnd = function() {
    return delete this.startLink.chip.link.inputs[this.startLink.pin];
  };
  return Connector;
})();
GrahpicChip = (function() {
  var inputPinClickHandler, outputPinClickHandler;
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
  outputPinClickHandler = function(chip, pin) {
    return function() {
      if (uiMode === 'normal') {
        connectorStart = {
          chip: chip,
          pin: pin
        };
        return uiMode = 'connector';
      }
    };
  };
  inputPinClickHandler = function(chip, pin) {
    return function() {
      var c;
      if (uiMode === 'connector') {
        c = new Connector(chip.paper, connectorStart, {
          chip: chip,
          pin: pin
        });
        return uiMode = 'normal';
      }
    };
  };
  GrahpicChip.prototype.createSvg = function(paper, x, y) {
    var all, allSet, clickRect, clickRects, element, height, i, input, inputs, line, maxInputWidth, maxOutputWidth, maxPins, name, numInputs, numOutputs, output, outputs, pinStart, rect, text, w, _i, _j, _len, _len2;
    this.paper = paper;
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
    maxInputWidth = 0;
    clickRects = [];
    for (input in this.inputs) {
      y = this.pinY(i++);
      line = paper.hline(this.x, y, 10);
      text = paper.textAlign(this.x + this.pinWidth + 3, y, input, 'left');
      this.pinPos.inputs[input] = y - this.y;
      if ((w = text.getBBox().width) > maxInputWidth) {
        maxInputWidth = w;
      }
      clickRect = paper.rect(this.x, y - this.pinGap / 2, this.pinWidth + 3 + text.getBBox().width, this.pinGap).attr({
        fill: 'transparent',
        stroke: 'transparent'
      });
      $(clickRect.node).click(inputPinClickHandler(this, input));
      clickRects.push(clickRect);
      inputs.push(line, text, clickRect);
    }
    numInputs = i;
    i = 0;
    outputs = [];
    maxOutputWidth = 0;
    for (output in this.outputs) {
      y = this.pinY(i++);
      line = paper.hline(this.x + this.minWidth, y, -10);
      text = paper.textAlign(this.x + this.minWidth - this.pinGap - 3, y, output, 'right');
      this.pinPos.outputs[output] = y - this.y;
      if ((w = text.getBBox().width) > maxOutputWidth) {
        maxOutputWidth = w;
      }
      clickRect = paper.rect(this.x + this.minWidth, y - this.pinGap / 2, this.pinWidth + 3 + text.getBBox().width, this.pinGap).attr({
        fill: 'transparent',
        stroke: 'transparent'
      });
      clickRect = align(clickRect, 'right');
      clickRect = align(clickRect, 'right');
      $(clickRect.node).click(outputPinClickHandler(this, output));
      clickRects.push(clickRect);
      outputs.push(line, text, clickRect);
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
      var connector, connectors, linkName, _ref, _ref2, _results;
      this.x = rect.attr('x');
      this.y = rect.attr('y');
      _ref = this.link.inputs;
      for (linkName in _ref) {
        connector = _ref[linkName];
        if (connector) {
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
          var _j, _len2, _results2;
          _results2 = [];
          for (_j = 0, _len2 = connectors.length; _j < _len2; _j++) {
            connector = connectors[_j];
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
    for (_j = 0, _len2 = clickRects.length; _j < _len2; _j++) {
      x = clickRects[_j];
      x.toFront();
    }
    return this.svg = {
      set: allSet,
      items: (function() {
        var _k, _len3, _results;
        _results = [];
        for (_k = 0, _len3 = all.length; _k < _len3; _k++) {
          element = all[_k];
          _results.push(element.node);
        }
        return _results;
      })()
    };
  };
  return GrahpicChip;
})();