class Clock
	time = 0
	
	time: -> time
	
	advance: -> time++

exports.Clock = Clock
