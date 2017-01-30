import utils from '../utils/drawUtils'

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

export const changeBaseColor = ( colorPicker, mouse ) => {
	const { context, vertical } = colorPicker.ribbon
	util.drawRibbonBar(context)( dragContainment( ctx, mouse ), vertical )
	return colorPicker 
}
export const changeShadeColor = ( colorPicker, mouse ) => {
	util.drawPalettePointer(
		colorPicker.ribbon.context
	)(dragContainment( ctx, mouse ))
	return colorPicker
}

export const painterEvent = ( state, action ) => {
	const { painter, saves, points, tool } = state
	const context = painter.context
	const { type, event } = action
	const canvas = context.canvas

	const { x, y } = getCoordinate( canvas, event )
	context.clearRect(0, 0, canvas.width, canvas.height)
	const lastSave = saves.length > 0 ?
		saves[0] : null
	if (lastSave) context.putImageData(lastSave,0,0)
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
						points: newPoints
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
