# No node for the browser :'( We'll have to make our own stuff

class EventEmitter

	constructor: ->
		@_events = {}
	
	on: (name, callback) ->
	
		@_events[name] ||= []
		@_events[name].push callback
		
	emit: (name, args...) ->
		
		if @_events[name]
			for callback in @_events[name]
				callback args

exports.EventEmitter = EventEmitter
