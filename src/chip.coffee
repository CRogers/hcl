zeros = (size) ->
	(false for x in [0...size])

ones = (size) -> 
	(true for x in [0...size])


class Chip

	lastCalc = -1

	constructor: (@chip, @clock) ->
		
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
			# See if we have already calculated the value this tick and only calculate if necessary
			if lastCalc < @clock.time()
				func.call @inputs
	
	setInput: (name, value) ->
		@inputs[name] = if typeof value is 'function' then value else -> value
		
		# Reset the cache timer as things have changed
		lastCalc = -1

exports.Chip = Chip
