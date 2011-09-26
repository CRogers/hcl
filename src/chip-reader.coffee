_ = require 'underscore'
fs = require 'fs'

# Find all the names of the chips and strip the .json
_chipNames = _(fs.readdirSync '../chips').chain().select (f) -> f.substr(-4) == 'json'

# Now try and load & parse each of them
chips = {}
_chipNames.each (name) ->
	chips[name[0...-5]] = eval fs.readFileSync "../chips/#{name}", 'utf8'

setTimeout console.log chips
