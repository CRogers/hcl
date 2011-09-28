colors = require('colors')

arrayEqual = (arr, brr) ->
	not (arr < brr or brr < arr)

puts = (data) -> process.stdout.write data.toString()

exports.truthTable = (chip, inputs, outputs, tests) ->
	
	console.log "Testing truthtable for ".blue + colors.cyan chip.chip.name
	
	for test in tests	
		inputValues = test[0]
		outputValues = test[1]
		for i in [0...inputs.length]
			chip.setInput inputs[i], inputValues[i]
		
		puts inputValues
		puts '  '
		
		allPassed = yes
		for i in [0...outputs.length]
			output = outputs[i]
			expected = outputValues[i]
			success = arrayEqual chip.outputs[output](), expected
			out = "#{output}:#{expected}; "
			puts if success then colors.green out else colors.red out
			allPassed &&= success
		
		console.log '  ' + if allPassed then 'success'.green else 'failure'.red
		
		chip.clock.advance()
	
	console.log()
