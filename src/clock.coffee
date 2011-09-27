EventEmitter = require('events').EventEmitter

class Clock extends EventEmitter
	time = 0
	
	time: -> time
	
	advance: ->
		@emit 'tick', ++time
		time

exports.Clock = Clock
