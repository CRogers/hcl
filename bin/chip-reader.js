var defaultChipsDir, fs, listChips, loadChips, _;
_ = require('underscore');
fs = require('fs');
defaultChipsDir = "" + __dirname + "/../chips";
exports.readChips = function(dir) {
  if (dir == null) {
    dir = defaultChipsDir;
  }
  return loadChips(listChips(dir), dir);
};
exports.listChips = listChips = function(dir) {
  if (dir == null) {
    dir = defaultChipsDir;
  }
  return _.select(fs.readdirSync(dir), function(f) {
    return f.substr(-4) === 'json';
  });
};
exports.loadChips = loadChips = function(chipNames, dir) {
  var chips, name, _i, _len;
  if (dir == null) {
    dir = defaultChipsDir;
  }
  chips = {};
  for (_i = 0, _len = chipNames.length; _i < _len; _i++) {
    name = chipNames[_i];
    chips[name.slice(0, -5)] = eval(fs.readFileSync("" + dir + "/" + name, 'utf8'));
  }
  return chips;
};