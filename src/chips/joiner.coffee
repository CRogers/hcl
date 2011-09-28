{
	name: 'joiner'
	description: 'Joins 2 smaller buses into one larger bus'
	generics:
		aw: 8
		bw: 8
	inputs:
		a: 'aw'
		b: 'bw'
	outputs:
		out: -> @inputs.a().concat @inputs.b()
}
