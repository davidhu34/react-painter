import utils from '../utils/drawUtils'
import dragContainment from '../utils/dragContainment'
import Color from 'color'

const DOWN = 'PAINTER_MOUSE_DOWN'
const MOVE = 'PAINTER_MOUSE_MOVE'
const UP = 'PAINTER_MOUSE_UP'

const getCoordinate = ( canvas, e ) => ({
	x: e.clientX - canvas.offsetLeft,
	y: e.clientY - canvas.offsetTop,
})

const newSaves = (ctx, saves) => {
	const { width, height } = ctx.canvas
	const imgs = [ctx.getImageData(0, 0, width, height), ...saves]
	return saves.length < 10 ?
		imgs : imgs.slice(0,10)
}

const changePalette = ( context, color ) => {
	const { width, height } = context.canvas
	const whiteGrad = context.createLinearGradient(0, 0, width, 0)
	const blackGrad = context.createLinearGradient(0, 0, 0, height)

	context.clearRect(0, 0, width, height)
	console.log(color.rgb())
	context.fillStyle = color.rgb()
	context.fillRect(0, 0, width, height)

	whiteGrad.addColorStop(0, 'rgb(255,255,255)')
	whiteGrad.addColorStop(1, 'transparent')
	context.fillStyle = whiteGrad
	context.fillRect(0, 0, width, height)

	blackGrad.addColorStop(0, 'transparent')
	blackGrad.addColorStop(1, 'rgb(0,0,0)')
	context.fillStyle = blackGrad
	context.fillRect(0, 0, width, height)

	context.fillStyle = color.rgb()
}

export const changeBaseColor = ( colorPicker, event ) => {
	const { ribbon, palette } = colorPicker
	const r_context = ribbon.context
	const p_context = palette.context
	const { x, y } = dragContainment( r_context, event )
	const { width, height } = r_context.canvas

	r_context.clearRect(0, 0, width, height)
	r_context.putImageData(ribbon.background, 0, 0)
	console.log(x, y)
	console.log(...r_context.getImageData(x, y, 1,1).data)
	const newBaseColor = Color.rgb(...r_context.getImageData(x, y, 1,1).data)
	changePalette(p_context, newBaseColor)

	const newBackground = p_context.getImageData(0,0,p_context.canvas.width, p_context.canvas.height)
	
	utils.drawRibbonBar(r_context)( x, y, ribbon.vertical)
	utils.drawPalettePoint(p_context)( palette.position.x, palette.position.y )

	return {
		...colorPicker,
		palette: {
			...palette,
			background: newBackground
		},
		ribbon: {
			...ribbon,
			position: {x, y}
		},
		color: Color.rgb(...p_context.getImageData(palette.position.x, palette.position.y, 1,1).data)
	}
}
export const changeShadeColor = ( colorPicker, event ) => {
	const palette = colorPicker.palette
	const context = palette.context
	const { x, y } = dragContainment( context, event )
	const { width, height } = context.canvas

	context.clearRect(0, 0, width, height)
	context.putImageData(palette.background, 0, 0)
	utils.drawPalettePoint(context)( x, y )

	return {
		...colorPicker,
		palette: {
			...palette,
			position: {x, y}
		},
		color: Color.rgb(...context.getImageData(x, y, 1,1).data)
	}
}

export const painterEvent = ( state, action ) => {
	const { painter, saves, points, tool, color } = state
	const context = painter.context
	const { type, event } = action
	const canvas = context.canvas

	const { x, y } = getCoordinate( canvas, event )
	context.clearRect(0, 0, canvas.width, canvas.height)
	const lastSave = saves.length > 0 ?
		saves[0] : null
	if (lastSave) context.putImageData(lastSave, 0, 0)
	/*if (saves.length > 0) {
		lastSave = new Image()
		context.drawImage(lastSave, 0, 0)
		lastSave.src = saves[saves.length-1]
		console.log(lastSave)
	}*/

	switch (tool) {
		case 'oval':
			switch (type) {
				case DOWN:
					return {
						...state,
						points: [{x, y}]
					}
				case MOVE:
					utils.drawOval(context)(x, y, points[0])
					return state
				case UP:
					utils.drawOval(context)(x, y, points[0])
				default:
					return {
						...state,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end oval
		case 'circle':
			switch (type) {
				case DOWN:
					return {
						...state,
						points: [{x, y}]
					}
				case MOVE:
					utils.drawCircle(context)(x, y, points[0])
					return state
				case UP:
					utils.drawCircle(context)(x, y, points[0])
				default:
					return {
						...state,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end circle
		case 'rect':
			switch (type) {
				case DOWN:
					utils.drawDot(x,y)
					return {
						...state,
						points: [{x, y}]
					}
				case MOVE:
					utils.drawRect(context)(x, y, points[0])
					return state
				case UP:
					utils.drawRect(context)(x, y, points[0])
				default:
					return {
						...state,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end rect
		case 'square':
			switch (type) {
				case DOWN:
					utils.drawDot(x,y)
					return {
						...state,
						points: [{x, y}]
					}
				case MOVE:
					utils.drawSquare(context)(x, y, points[0])
					return state
				case UP:
					utils.drawSquare(context)(x, y, points[0])
				default:
					return {
						...state,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end square
		case 'line':
			switch (type) {
				case DOWN:
					utils.drawDot(x,y)
					return {
						...state,
						points: [{x, y}]
					}
				case MOVE:
					utils.drawLine(context)(x, y, [...points, {x, y}])
					return state
				case UP:
					utils.drawLine(context)(x, y, [...points, {x, y}])
				default:
					return {
						...state,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end line
		case 'pen':
		default:
			const newPoints = [ ...points, { x, y }]
			switch (type) {
				case DOWN:
					utils.drawDot(context)(x,y)
					return {
						...state,
						points: newPoints,
						saves: newSaves(context, saves)
					}
				case MOVE:
					utils.drawLine(context)(x, y, newPoints)
					return {
						...state,
						points: newPoints
					}
				case UP:
					utils.drawLine(context)(x, y, newPoints)
				default:
					return {
						...state,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end pen
	}
}
