{
	name: 'and'
	description: 'Takes two inputs and applies the boolean AND operation'
	inputs:
		a: 1
		b: 1
	outputs:
		out: -> [ a()[0] && b()[0] ]
}
