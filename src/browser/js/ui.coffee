Chip = require('chip').Chip
Clock = require('clock').Clock

$(window).load ->

	paper = Raphael('canvasarea', '100%', '100%').draggable.enable()
	
	clock = new Clock()
	
	a = new GrahpicChip(chips.and, clock)
	a.createSvg paper, 50, 50
	

hline = (paper, x, y, width) ->
	paper.path "M#{x} #{y}L#{x+width} #{y}"


class GrahpicChip extends Chip	 	
	 
	 createSvg: (paper, @x, @y) ->
	 	
	 	rect = paper.rect(@x, @y, 50, 50).attr
	 		fill: '#fff'
	 		
	 	name = paper.text(@x+25, @y+15, @chip.name).attr
	 		'font-size': 12
	 	
	 	i = 0
	 	inputLines = []
	 	for input of @inputs
	 		inputLines.push hline paper, @x, @y+20+i++*10, 10
	 	
	 	i = 0
	 	outputLines = []
	 	for output of @outputs
	 		outputLines.push hline paper, @x+50, y+20+i++*10, -10
	 	
	 	
	 	all = paper.set().draggable.enable()
	 	all.push(rect, name)
	 	all.push.apply this, inputLines
	 	all.push.apply this, outputLines
	 		
	 			 		
