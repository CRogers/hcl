var arrayEqual, colors, puts;
colors = require('colors');
arrayEqual = function(arr, brr) {
  return !(arr < brr || brr < arr);
};
puts = function(data) {
  return process.stdout.write(data.toString());
};
exports.truthTable = function(chip, inputs, outputs, tests) {
  var allPassed, expected, i, inputValues, out, output, outputValues, success, test, _i, _len, _ref, _ref2;
  console.log("Testing truthtable for ".blue + colors.cyan(chip.chip.name));
  for (_i = 0, _len = tests.length; _i < _len; _i++) {
    test = tests[_i];
    inputValues = test[0];
    outputValues = test[1];
    for (i = 0, _ref = inputs.length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
      chip.setInput(inputs[i], inputValues[i]);
    }
    puts(inputValues);
    puts('  ');
    allPassed = true;
    for (i = 0, _ref2 = outputs.length; 0 <= _ref2 ? i < _ref2 : i > _ref2; 0 <= _ref2 ? i++ : i--) {
      output = outputs[i];
      expected = outputValues[i];
      success = arrayEqual(chip.outputs[output](), expected);
      out = "" + output + ":" + expected + "; ";
      puts(success ? colors.green(out) : colors.red(out));
      allPassed && (allPassed = success);
    }
    console.log('  ' + (allPassed ? 'success'.green : 'failure'.red));
    chip.clock.advance();
  }
  return console.log();
};