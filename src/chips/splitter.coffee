{
	name: 'splitter'
	description: 'Slices up a bus into smaller buses'
	color: 'teal'
	generics:
		start: 2
		end: 4
		width: 8 
	inputs:
		bus: 'width'
	outputs:
		low: -> @inputs.bus()[0...@generics.start]
		mid: -> @inputs.bus()[@generics.start..@generics.end]
		high: -> @inputs.bus()[@generics.end+1...@generics.width]
}
