{
	name: 'dFlipFlop'
	description: 'Saves 1 bit of state from the last clock tick'
	inputs:
		d: 1
	outputs:
		q: -> [@state.data]
	onTick: -> 	@state.data = @d()[0]
	state:
		data: [false]
}
