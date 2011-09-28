_ = require 'underscore'
fs = require 'fs'


defaultChipsDir = "#{__dirname}/../chips"

exports.readChips = (dir = defaultChipsDir) ->
	loadChips (listChips dir), dir

exports.listChips = listChips = (dir = defaultChipsDir) ->
	# Find all the names of the chips and strip the .json
	_.select (fs.readdirSync dir),  (f) -> f.substr(-4) == 'json'


exports.loadChips = loadChips = (chipNames, dir = defaultChipsDir) ->
	# Now try and load & parse each of them
	chips = {}
	for name in chipNames
		chips[name[0...-5]] = eval fs.readFileSync "#{dir}/#{name}", 'utf8'
		
	chips
