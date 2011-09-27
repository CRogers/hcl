fw = require('./framework')
Chip = require('../bin/chip').Chip
chipsReader = require('../bin/chip-reader')

chips = chipsReader.readChips()

fw.truthTable new Chip(chips.or), 'a', 'b', 'out', [

	[[false],	[false],	[false]],
	[[false],	[true], 	[true]],
	[[true],	[false],	[true]],
	[[true],	[true], 	[true]],

]

fw.truthTable new Chip(chips.and), 'a', 'b', 'out', [

	[[false],	[false],	[false]],
	[[false],	[true], 	[false]],
	[[true],	[false],	[false]],
	[[true],	[true], 	[true]],

]
