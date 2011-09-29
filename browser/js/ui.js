var Chip, GrahpicChip;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Chip = require('chip').Chip;
$(function() {
  var circle, move, paper, start;
  paper = Raphael('canvasarea', '100%', '100%');
  circle = paper.circle(150, 150, 100).attr({
    fill: '#f00',
    stroke: '#fff'
  });
  start = function() {
    this.ox = this.attr('cx');
    return this.oy = this.attr('cy');
  };
  move = function(dx, dy) {
    return this.attr({
      cx: this.ox + dx,
      cy: this.oy + dy
    });
  };
  return circle.drag(start, move, function() {});
});
GrahpicChip = (function() {
  __extends(GrahpicChip, Chip);
  function GrahpicChip() {
    this.x = 0;
    this.y = 0;
  }
  return GrahpicChip;
})();