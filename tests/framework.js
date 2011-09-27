var arrayEqual, colors;
var __slice = Array.prototype.slice;
colors = require('colors');
arrayEqual = function(arr, brr) {
  return !(arr < brr || brr < arr);
};
exports.truthTable = function() {
  var chip, i, inputs, output, test, tests, _i, _j, _len, _ref;
  chip = arguments[0], inputs = 4 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 2) : (_i = 1, []), output = arguments[_i++], tests = arguments[_i++];
  console.log("Testing truthtable for ".blue + colors.cyan(chip.chip.name));
  for (_j = 0, _len = tests.length; _j < _len; _j++) {
    test = tests[_j];
    for (i = 0, _ref = inputs.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      chip.setInput(inputs[i], test[i]);
    }
    console.log(test + ' ' + (arrayEqual(chip.outputs[output](), test[test.length - 1]) ? 'success'.green : 'failure'.red));
    chip.clock.advance();
  }
  return console.log();
};