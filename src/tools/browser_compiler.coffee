chipReader = require '../bin/chip-reader'
fs = require 'fs'

beginning = 
	"""
	var exports = {};
	var modules = {};
	var requiredCache = {};
	var chips = {};

	function require(name){
		if(!requiredCache[name]){
			modules[name].call(window);
			requiredCache[name] = true;
		}
		return exports[name];
	}
	
	"""

addModule = (name, code) -> 
	"""
	modules['#{name}'] = (function(){

		var exports = exports['#{name}'] = {}
	
		#{code}

	});
	
	"""

addChip = (name, code) ->
	"""
	chips['#{name}'] = #{code};
	
	"""



script = beginning

for name in chipReader.listChips()
	script += addChip name[0...-5], (fs.readFileSync "#{__dirname}/../chips/#{name}", 'utf8')

for file in fs.readdirSync "#{__dirname}/../bin/"
	console.log file
	if file isnt 'chip-reader.js'
		script += addModule file[0...-3], fs.readFileSync "#{__dirname}/../bin/#{file}"

fs.writeFileSync "#{__dirname}/../browser/js/hcl.js", script
