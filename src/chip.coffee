zeros = (size) ->
	(false for x in [0...size])

ones = (size) -> 
	(true for x in [0...size])


class Chip
	constructor: (@chip) ->
		
		@inputs = {}
		
		# Init the inputs to give all zeros
		for name, pins of @chip.inputs
			@setInput name, zeros pins
		
		@outputs = {}
		
		# Add the outputs to the object
		for name, func of @chip.outputs
			@setOutput name, func
	
	setOutput: (name, func) ->
		@outputs[name] = =>
			func.call @inputs
	
	setInput: (name, value) ->
		@inputs[name] = if typeof value is 'function' then value else -> value

exports.Chip = Chip
