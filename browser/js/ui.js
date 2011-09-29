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
$(window).load(function() {
  var circle, end, move, paper, start;
  paper = Raphael('canvasarea', '100%', '100%');
  circle = paper.circle(150, 150, 50).attr({
    fill: '#f00',
    stroke: '#fff',
    opacity: 0.5
  });
  start = function() {
    this.ox = this.attr('cx');
    this.oy = this.attr('cy');
    return this.animate({
      r: 70,
      opacity: .25
    }, 500, ">");
  };
  move = function(dx, dy) {
    return this.attr({
      cx: this.ox + dx,
      cy: this.oy + dy
    });
  };
  end = function() {
    return this.animate({
      r: 50,
      opacity: .5
    }, 500, ">");
  };
  return circle.drag(move, start, end);
});
GrahpicChip = (function() {
  __extends(GrahpicChip, Chip);
  function GrahpicChip() {
    this.x = 0;
    this.y = 0;
  }
  return GrahpicChip;
})();