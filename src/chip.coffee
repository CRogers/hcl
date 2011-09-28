zeros = (size) ->
	(false for x in [0...size])

ones = (size) -> 
	(true for x in [0...size])


class Chip

	lastCalc = -1

	constructor: (@chip, @clock, @generics) ->
		
		# Set up all the objects we need
		@inputs = {}
		@outputs = {}
		@state = {}
		@generics ||= {}
		
		for name of @chip.generics
			@generics[name] ||= @chip.generics[name]
		
		# Add an internal object linking sandboxing just what is needed for the chip file to use
		@internal =
			inputs: @inputs
			state: @state
			generics: @generics
		
		# Init the inputs to give all zeros
		for name, pins of @chip.inputs
		
			# Check for generics
			if typeof pins is 'string'
				pins = @generics?[pins] ? @chip.generics[pins]
			
			@setInput name, zeros pins
					
			
		# Add the outputs to the object
		for name, func of @chip.outputs
			@setOutput name, func
			
		
		# Add the state vars
		for name, value of @chip.state
			@setState name, value.call @internal
		
		# Set up events
		if @chip.onTick
			@clock.on 'tick', => @chip.onTick.call @internal
			
	
	setOutput: (name, func) ->
		@outputs[name] = =>			
			# See if we have already calculated the value this tick and only calculate if necessary
			if lastCalc < @clock.time()
				func.call @internal
	
	setInput: (name, value) ->
		@inputs[name] = if typeof value is 'function' then value else -> value
		
		# Reset the cache timer as things have changed
		lastCalc = -1
	
	setState: (name, value) ->
		@state[name] = value

exports.Chip = Chip
