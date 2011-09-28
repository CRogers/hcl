{
	name: 'dFlipFlop'
	description: 'Saves 1 bit of state from the last clock tick'
	generics:
		x: 1
	inputs:
		d: 'x'
	outputs:
		q: -> @state.data
	onTick: -> @state.data = @inputs.d()
	state:
		data: -> (false for i in [0...@generics.x])
}
