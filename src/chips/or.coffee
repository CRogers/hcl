{
	name: 'or'
	description: 'Takes two inputs and applies the boolean OR operation'
	color: 'orange'
	inputs:
		a: 1
		b: 1
	outputs:
		out: -> [ @inputs.a()[0] || @inputs.b()[0] ]
}
