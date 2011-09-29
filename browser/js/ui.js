var Chip, Clock, GrahpicChip, danimate, hline, rscale;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
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
  var a, clock, o;
  window.paper = Raphael('canvasarea', '100%', '100%').draggable.enable();
  clock = new Clock();
  a = new GrahpicChip(chips.and, clock);
  a.createSvg(paper, 50, 50);
  o = new GrahpicChip(chips.or, clock);
  return o.createSvg(paper, 100, 50);
});
hline = function(paper, x, y, width) {
  return paper.path("M" + x + " " + y + "L" + (x + width) + " " + y);
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
GrahpicChip = (function() {
  __extends(GrahpicChip, Chip);
  function GrahpicChip() {
    GrahpicChip.__super__.constructor.apply(this, arguments);
  }
  GrahpicChip.prototype.createSvg = function(paper, x, y) {
    var all, height, i, input, inputLines, name, output, outputLines, rect, width;
    this.x = x;
    this.y = y;
    width = 50;
    height = 50;
    i = 0;
    inputLines = [];
    for (input in this.inputs) {
      inputLines.push(hline(paper, this.x, this.y + 20 + i++ * 10, 10));
    }
    i = 0;
    outputLines = [];
    for (output in this.outputs) {
      outputLines.push(hline(paper, this.x + width, y + 20 + i++ * 10, -10));
    }
    rect = paper.rect(this.x, this.y, width, height, 15).attr({
      fill: this.chip.color,
      'fill-opacity': 0.05,
      stroke: this.chip.color,
      'stroke-width': 2
    });
    name = paper.text(this.x + 25, this.y + 15, this.chip.name).attr({
      'font-size': 12,
      'fill': 'white'
    });
    all = paper.set().draggable.enable();
    all.push(rect, name);
    all.push.apply(this, inputLines);
    all.push.apply(this, outputLines);
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