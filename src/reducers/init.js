const initPainter = {
	width: 500,
	height: 500,
	style: {
		border: '2px solid black'
	},
	isDown: false,
	context: null,
	saves: [],
	points: []
}
const initRibbon = {
	width: 50,
	height: 200,
	style: {
		border: '2px solid black'
	},
	vertical: true,
	position: {x:0, y:150},
	isDown: false,
	context: null,
	background: null
}
const initPalette = {
	width: 200,
	height: 200,
	style: {
		border: '2px solid black'
	},
	isDown: false,
	position: {
		x:150, y:50
	},
	context: null,
	background: null
}

export const initState = {
	tool: 'pen',
	focus: null,
	strokeColor: '#0dd00f',
	fillColor: '#00000f',
	painter: initPainter,
	colorPicker: {
		color: null,
		ribbon: initRibbon,
		palette: initPalette
	}
}
