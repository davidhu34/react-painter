import draw from '../utils/painterDrawUtils'

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

export const painterInit = (state, action) => {
	const ctx = action.context
	ctx.strokeStyle = '#0dd00f'
	ctx.fillStyle = '#00000f'
	ctx.lineWidth = 15
	ctx.lineJoin = 'round'
	ctx.lineCap = 'round'
	return {
		...state,
		context: ctx
	}
}
export const pianterEvent = ( state, action ) => {
	const { context, saves, points } = state
	const { type, event, tool } = action
	const canvas = context.canvas
	
	const { x, y } = getCoordinate( canvas, event )
	
	context.clearRect(0, 0, canvas.width, canvas.height)
	const lastSave = saves.length > 0 ?
		saves[0] : null
	if (lastSave) context.putImageData(lastSave, 0, 0)
	
	const newState
		= (type === UP)? {
			...state, isDown: false
		} : (type === DOWN)? {
			...state, isDown: true
		} : state
	switch (tool) {
		case 'oval':
			switch (type) {
				case DOWN:
					return {
						...newState,
						points: [{x, y}]
					}
				case MOVE:
					draw.oval(context)(x, y, points[0])
					return state
				case UP:
					draw.oval(context)(x, y, points[0])
				default:
					return {
						...newState,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end oval
		case 'circle':
			switch (type) {
				case DOWN:
					return {
						...newState,
						points: [{x, y}]
					}
				case MOVE:
					draw.circle(context)(x, y, points[0])
					return state
				case UP:
					draw.circle(context)(x, y, points[0])
				default:
					return {
						...newState,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end circle
		case 'rect':
			switch (type) {
				case DOWN:
					draw.dot(x,y)
					return {
						...newState,
						points: [{x, y}]
					}
				case MOVE:
					draw.rect(context)(x, y, points[0])
					return state
				case UP:
					draw.rect(context)(x, y, points[0])
				default:
					return {
						...newState,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end rect
		case 'square':
			switch (type) {
				case DOWN:
					draw.dot(x,y)
					return {
						...newState,
						points: [{x, y}]
					}
				case MOVE:
					draw.square(context)(x, y, points[0])
					return state
				case UP:
					draw.square(context)(x, y, points[0])
				default:
					return {
						...newState,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end square
		case 'line':
			switch (type) {
				case DOWN:
					draw.dot(x,y)
					return {
						...newState,
						points: [{x, y}]
					}
				case MOVE:
					draw.line(context)(x, y, [...points, {x, y}])
					return state
				case UP:
					draw.line(context)(x, y, [...points, {x, y}])
				default:
					return {
						...newState,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end line
		case 'pen':
		default:
			const newPoints = [ ...points, { x, y }]
			switch (type) {
				case DOWN:
					draw.dot(context)(x,y)
					return {
						...newState,
						points: newPoints,
						saves: newSaves(context, saves)
					}
				case MOVE:
					draw.line(context)(x, y, newPoints)
					return {
						...newState,
						points: newPoints
					}
				case UP:
					draw.line(context)(x, y, newPoints)
				default:
					return {
						...newState,
						points: [],
						saves: newSaves(context, saves)
					}
			}   // end pen
	}
}
