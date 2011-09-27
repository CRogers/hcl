var fs, _;
_ = require('underscore');
fs = require('fs');
exports.readChips = function() {
  var chips, _chipNames;
  _chipNames = _(fs.readdirSync('../chips')).chain().select(function(f) {
    return f.substr(-4) === 'json';
  });
  chips = {};
  _chipNames.each(function(name) {
    return chips[name.slice(0, -5)] = eval(fs.readFileSync("../chips/" + name, 'utf8'));
  });
  return chips;
};