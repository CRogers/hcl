var addChip, addModule, beginning, chipReader, file, fs, name, script, _i, _j, _len, _len2, _ref, _ref2;
chipReader = require('../bin/chip-reader');
fs = require('fs');
beginning = "var exports = {};\nvar modules = {};\nvar requiredCache = {};\nvar chips = {};\n\nfunction require(name){\n	if(!requiredCache[name]){\n		modules[name].call(window);\n		requiredCache[name] = true;\n	}\n	return exports[name];\n}\n";
addModule = function(name, code) {
  return "modules['" + name + "'] = (function(){\n\n	var exports = exports['" + name + "'] = {}\n\n	" + code + "\n\n});\n";
};
addChip = function(name, code) {
  return "chips['" + name + "'] = " + code + ";\n";
};
script = beginning;
_ref = chipReader.listChips();
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  name = _ref[_i];
  script += addChip(name.slice(0, -5), fs.readFileSync("" + __dirname + "/../chips/" + name, 'utf8'));
}
_ref2 = fs.readdirSync("" + __dirname + "/../bin/");
for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
  file = _ref2[_j];
  console.log(file);
  if (file !== 'chip-reader.js') {
    script += addModule(file.slice(0, -3), fs.readFileSync("" + __dirname + "/../bin/" + file));
  }
}
fs.writeFileSync("" + __dirname + "/../browser/js/hcl.js", script);