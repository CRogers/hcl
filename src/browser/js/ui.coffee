Chip = require('chip').Chip
Clock = require('clock').Clock

$ ->

	window.paper = Raphael('canvasarea', '100%', '100%').draggable.enable()
	
	clock = new Clock()
	
	a = new GrahpicChip(chips.and, clock)
	a.createSvg paper, 50, 50
	
	o = new GrahpicChip(chips.or, clock)
	o.createSvg paper, 100, 50
	

hline = (paper, x, y, width) ->
	paper.path "M#{x} #{y}L#{x+width} #{y}"

danimate = (obj, attrs, time, type) ->
	newAttrs = {}
	for k,v of attrs
		newAttrs[k] = obj.attr(k) + v
		
	obj.animate newAttrs, time, type

rscale = (rect, d, time, type) ->
	danimate rect, {x: -d, y: -d, width: 2*d, height: 2*d}, time, type


class GrahpicChip extends Chip	 	
	 
	 createSvg: (paper, @x, @y) ->
	 	
	 	width = 50
	 	height = 50
	 	
	 	i = 0
	 	inputLines = []
	 	for input of @inputs
	 		inputLines.push hline paper, @x, @y+20+i++*10, 10
	 	
	 	i = 0
	 	outputLines = []
	 	for output of @outputs
	 		outputLines.push hline paper, @x+width, y+20+i++*10, -10
	 	
	 	rect = paper.rect(@x, @y, width, height, 15).attr
	 		fill: @chip.color
	 		'fill-opacity': 0.05
	 		stroke: @chip.color
	 		'stroke-width': 2	
	 		
	 	name = paper.text(@x+25, @y+15, @chip.name).attr
	 		'font-size': 12
	 		'fill': 'white'
	 	
	 	
	 	all = paper.set().draggable.enable()
	 	all.push(rect, name)
	 	all.push.apply this, inputLines
	 	all.push.apply this, outputLines
	 	
	 	all.attr 'cursor', 'move'
	 	
	 	all.draggable.onstartdrag = ->
	 		rect.animate {'fill-opacity': 0.2}, 500, '>'
	 	
	 	all.draggable.onenddrag = ->
	 		rect.animate {'fill-opacity': 0.05}, 500, '>'
