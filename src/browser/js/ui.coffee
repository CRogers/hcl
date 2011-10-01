Chip = require('chip').Chip
Clock = require('clock').Clock


uiMode = 'normal' #'connector'

# connector
connectorStart = null

$ ->

	window.pppaper = paper = Raphael('canvasarea', '100%', '100%').draggable.enable()
	
	clock = new Clock()
	
	a = new GrahpicChip(chips.and, clock)
	a.createSvg paper, 50, 50
	
	o = new GrahpicChip(chips.dFlipFlop, clock)
	o.createSvg paper, 200, 50
	
	#c = new Connector(paper, {chip:a, pin:'out'}, {chip:o, pin:'d'})
	

Raphael.fn.hline = (x, y, width) ->
	@path "M#{x} #{y}L#{x+width} #{y}"

Raphael.fn.textAlign = (x, y, str, halign = 'center', valign = 'center') ->
	align (@text x, y, str), halign, valign

align = (obj, halign = 'center', valign = 'center') ->	
	bb = obj.getBBox()
	dw = bb.width/2
	dh = bb.height/2
	
	switch halign
		when 'left'
			obj.attr 'x', obj.attr('x') + dw
		when 'right'
			obj.attr 'x', obj.attr('x') - dw
			
	switch valign
		when 'top'
			obj.attr 'y', obj.attr('y') + dh
		when 'bottom'
			obj.attr 'y', obj.attr('y') - dh
	
	obj
	
pathFormat = (start, end) ->
	"M#{start.x} #{start.y}L#{end.x} #{end.y}"

Raphael.fn.connectors =
	items: {}
	
	add: ->
	
class Connector
	
	constructor: (@paper, @startLink, @endLink) ->
		@start = @end = {x:0, y:0}
		@svg = @paper.path pathFormat @start, @end
		@linkStart @startLink
		@linkEnd @endLink
		
	update: ->
		@svg.attr 'path', pathFormat @start, @end
		
	updateStart: (@start) -> @update()
	updateEnd: (@end) -> @update()		
		
	link: (type, obj, pin, noUpdate) ->
		link = obj.link[type]
		
		if not link[pin]
			link[pin] = []
	
		if link[pin].indexOf this == -1
			link[pin].push this
		
		if not noUpdate
			obj.svg.set.draggable.onmovedrag()
	
	linkStart: (@startLink, noUpdate) -> 
		@link 'outputs', @startLink.chip, @startLink.pin
		
	linkEnd:   (@endLink, noUpdate) -> 
		@link 'inputs', @endLink.chip, @endLink.pin
	
class GrahpicChip extends Chip		
	
	minWidth: 70
	minHeight: 40
	pinWidth: 10
	pinGap: 10
	
	pinY: (i) ->
		@y+@minHeight/2+i*10
	
	outputPinClickHandler = (chip, pin) ->
		->
			if uiMode is 'normal'
				connectorStart =
					chip: chip
					pin: pin
				uiMode = 'connector'
		
	inputPinClickHandler = (chip, pin) ->
		->
			if uiMode is 'connector'
				c = new Connector chip.paper, connectorStart,
					chip: chip
					pin: pin
				uiMode = 'normal'
	
	createSvg: (@paper, @x, @y) ->
		
		@link =
			inputs: {}
			outputs: {}
			
		@pinPos =
			inputs: {}
			outputs: {}
		
		pinStart = @minHeight/2
		
		# Make the input pins & labels
		i = 0
		inputs = []; maxInputWidth = 0; clickRects = []
		for input of @inputs
			y = @pinY(i++)
			line = paper.hline @x, y, 10
			text = paper.textAlign @x+@pinWidth+3, y, input, 'left'
			@pinPos.inputs[input] = y-@y
			if (w = text.getBBox().width) > maxInputWidth then maxInputWidth = w
			
			# Add click handlers for pin/text
			clickRect = paper.rect(@x, y-@pinGap/2, @pinWidth+3+text.getBBox().width, @pinGap).attr
				fill: 'transparent'
				stroke: 'transparent'
			$(clickRect.node).click inputPinClickHandler(this, input)
			clickRects.push clickRect
			
			inputs.push line, text, clickRect
			
		numInputs = i
		
		# Make the output pins & labels
		i = 0
		outputs = []; maxOutputWidth = 0
		for output of @outputs
			y = @pinY(i++)
			line = paper.hline @x+@minWidth, y, -10
			text = paper.textAlign @x+@minWidth-@pinGap-3, y, output, 'right'
			@pinPos.outputs[output] = y-@y
			if (w = text.getBBox().width) > maxOutputWidth then maxOutputWidth = w
			
			# Add click handlers for pin/text
			clickRect = paper.rect(@x+@minWidth, y-@pinGap/2, @pinWidth+3+text.getBBox().width, @pinGap).attr
				fill: 'transparent'
				stroke: 'transparent'
				
			# 2 aligns as it starts off aligned left not right. Yeah, I know.
			clickRect = align clickRect, 'right'
			clickRect = align clickRect, 'right'
			
			$(clickRect.node).click outputPinClickHandler(this, output)
			clickRects.push clickRect
			
			outputs.push line, text, clickRect
			
		numOutputs = i
		
		
		
		# Calculate the required height of the chip
		maxPins = Math.max numInputs, numOutputs
		height = @minHeight + (maxPins - 1) * @pinGap
		
		# Draw the rectangle
		rect = paper.rect(@x, @y, @minWidth, height, 15).attr
			fill: @chip.color
			'fill-opacity': 0.05
			stroke: @chip.color
			'stroke-width': 2	
		
		# Print the chip name
		name = paper.text(@x+@minWidth/2, @y+15, @chip.name).attr
			'font-size': 12
			'fill': 'white'
		
		@width = name.getBBox().width + 2*@pinGap + 2*10 + maxInputWidth*2 + maxOutputWidth*2
		
		rect.attr 'width', @width
		name.attr 'x', @x+@width/2
		
		for output in outputs
			output.translate @width - @minWidth, 0
		
		# Make the entire chip into a set
		all = [rect, name].concat inputs, outputs
		allSet = paper.set().draggable.enable()
		allSet.push.apply this, all
		
		allSet.attr 'cursor', 'move'
		
		
		
		# Animations for dragging of chip
		allSet.draggable.onstartdrag = ->
			rect.animate {'fill-opacity': 0.2}, 500, '>'
		
		allSet.draggable.onenddrag = ->
			rect.animate {'fill-opacity': 0.05}, 500, '>'
			
		# Make the connections move with the links
		allSet.draggable.onmovedrag = =>
			@x = rect.attr 'x'
			@y = rect.attr 'y'
		
			# Loop through each list of links from each pin and update it's position
			for linkName, connectors of @link.inputs
				for connector in connectors
					connector.updateEnd {x: @x, y: @y + @pinPos.inputs[linkName]}
			
			for linkName, connectors of @link.outputs
				for connector in connectors
					connector.updateStart {x: @x + @width, y: @y + @pinPos.outputs[linkName]}
		
		
		for x in clickRects
			x.toFront()
		
		@svg =
			set: allSet
			items: element.node for element in all
