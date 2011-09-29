Chip = require('chip').Chip

$ ->

	paper = Raphael('canvasarea', '100%', '100%')

	circle = paper.circle(150, 150, 100).attr
		fill: '#f00'
		stroke: '#fff'
	
	start = ->
		@ox = @attr 'cx'
		@oy = @attr 'cy'
	
	move = (dx,dy) ->
		@attr
			cx: @ox + dx
			cy: @oy + dy
	
	circle.drag(start, move, ->)
	

class GrahpicChip extends Chip
	
	 constructor: ->
	 	@x = 0
	 	@y = 0
	 	
