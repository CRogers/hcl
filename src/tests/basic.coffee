fw = require('./framework')
Chip = require('../bin/chip').Chip
Clock = require('../bin/clock').Clock
chipsReader = require('../bin/chip-reader')

chips = chipsReader.readChips()

clock = new Clock()

fw.truthTable new Chip(chips.or, clock), 'a', 'b', 'out', [

	[[false],	[false],	[false]],
	[[false],	[true], 	[true]],
	[[true],	[false],	[true]],
	[[true],	[true], 	[true]],

]

fw.truthTable new Chip(chips.and, clock), 'a', 'b', 'out', [

	[[false],	[false],	[false]],
	[[false],	[true], 	[false]],
	[[true],	[false],	[false]],
	[[true],	[true], 	[true]],

]


dff = new Chip(chips.dFlipFlop, clock)
dff.inputs.d = -> [ !dff.outputs.q()[0] ]

console.log dff.outputs.q()

for x in [0..10]
	clock.advance()
	console.log dff.outputs.q()
