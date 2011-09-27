var Clock;
Clock = (function() {
  var time;
  function Clock() {}
  time = 0;
  Clock.prototype.time = function() {
    return time;
  };
  Clock.prototype.advance = function() {
    return time++;
  };
  return Clock;
})();
exports.Clock = Clock;