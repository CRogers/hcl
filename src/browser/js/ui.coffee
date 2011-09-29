Chip = require('chip').Chip

$(window).load ->

	paper = Raphael('canvasarea', '100%', '100%')

	circle = paper.circle(150, 150, 50).attr
		fill: '#f00'
		stroke: '#fff'
		opacity: 0.5
	
	start = ->
		@ox = @attr 'cx'
		@oy = @attr 'cy'
		@animate {r: 70, opacity: .25}, 500, ">"
	
	move = (dx,dy) ->
		@attr
			cx: @ox + dx
			cy: @oy + dy
	
	end = ->
		@animate {r: 50, opacity: .5}, 500, ">"
	
	circle.drag(move, start, end)
	

class GrahpicChip extends Chip
	
	 constructor: ->
	 	@x = 0
	 	@y = 0
	 	
