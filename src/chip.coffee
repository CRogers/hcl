zeros = (size) ->
	(false for x in [0...size])

ones = (size) -> 
	(true for x in [0...size])


class Chip

	lastCalc = -1

	constructor: (@chip, @clock) ->
				
		# Init the inputs to give all zeros
		@inputs = {}
		for name, pins of @chip.inputs
			@setInput name, zeros pins
					
			
		# Add the outputs to the object
		@outputs = {}
		for name, func of @chip.outputs
			@setOutput name, func
			
		
		# Add the state vars
		@inputs.state = {}
		for name, value of @chip.state
			@setState name, value
		
		
		# Set up events
		if @chip.onTick
			@clock.on 'tick', => @chip.onTick.call @inputs
		
	
	setOutput: (name, func) ->
		@outputs[name] = =>			
			# See if we have already calculated the value this tick and only calculate if necessary
			if lastCalc < @clock.time()
				func.call @inputs
	
	setInput: (name, value) ->
		@inputs[name] = if typeof value is 'function' then value else -> value
		
		# Reset the cache timer as things have changed
		lastCalc = -1
	
	setState: (name, value) ->
		@inputs.state[name] = value

exports.Chip = Chip
