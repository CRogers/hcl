{
	name: 'and'
	description: 'Takes two inputs and applies the boolean AND operation'
	generics:
		x: 1
	inputs:
		a: 'x'
		b: 'x'
	outputs:
		out: -> 
			a = @inputs.a()
			b = @inputs.b()
			(a[i] && b[i] for i in [0...@generics.x])
}
