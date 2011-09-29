{
	name: 'and'
	description: 'Takes two inputs and applies the boolean AND operation'
	color: 'red'
	inputs:
		a: 1
		b: 1
	outputs:
		out: -> [ @inputs.a()[0] && @inputs.b()[0] ]
}
