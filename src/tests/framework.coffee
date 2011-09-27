colors = require('colors')

arrayEqual = (arr, brr) ->
	not (arr < brr or brr < arr)

exports.truthTable = (chip, inputs..., output, tests) ->
	
	console.log "Testing truthtable for ".blue + colors.cyan chip.chip.name
	
	for test in tests
		for i in [0...inputs.length]
			chip.setInput inputs[i], test[i]
				
		console.log test+' ' + if arrayEqual chip.outputs[output](), test[test.length-1] then 'success'.green else 'failure'.red
	
	console.log()
