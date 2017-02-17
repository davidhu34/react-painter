export const Add = () => ({
	type: 'ADD'
})

const mouseAction = (type, event) => ({ type, event })
const mouseActions = (upon, dispatch) => ({
	onMouseDown : (e) => dispatch(mouseAction(upon+'MOUSE_DOWN', e)),
	onMouseMove: (e) => dispatch(mouseAction(upon+'MOUSE_MOVE', e)),
	onMouseUp: (e) => dispatch(mouseAction(upon+'MOUSE_UP', e)),
	onMouseOut: (e) => dispatch(mouseAction(upon+'MOUSE_OUT', e)),
	onMouseEnter: (e) => dispatch(mouseAction(upon+'MOUSE_ENTER', e))
})
const mouseNullActions = {
	onMouseDown : null,
	onMouseMove: null,
	onMouseUp: null,
	onMouseOut: null,
	onMouseEnter: null
}

export const painterMouseActions = dispatch => isDown => {
	let { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
		= mouseActions('PAINTER_', dispatch)
	if (isDown)
		onMouseDown = null
	else
		onMouseMove = onMouseUp = null
	onMouseOut = onMouseUp
	onMouseEnter = null
	return { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
}
export const ribbonMouseActions = dispatch => isDown => {
	let { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
		= mouseNullActions
	onMouseDown = (e) => dispatch(startRibbonDrag(e))
	if (isDown) onMouseDown = null
	return { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
}
export const paletteMouseActions = dispatch => isDown => {
	let { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
		= mouseNullActions
    onMouseDown = (e) => dispatch(startPaletteDrag(e))
	if (isDown)	onMouseDown = null
	return { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
}

const changeBaseColor = e => ({
	type: 'CHANGE_BASE_COLOR',
	event: e
})
const changeShadeColor = e => ({
	type: 'CHANGE_SHADE_COLOR',
	event: e
})
export const startRibbonDrag = (event) => ( dispatch, getState ) => {
	dispatch( mouseAction('RIBBON_MOUSE_DOWN', event))
	const log = (e) => dispatch( changeBaseColor(e) )
	log(event)
	document.addEventListener("mousemove", log)
	document.addEventListener("mouseup", (e) => {
		document.removeEventListener("mousemove", log, false)
	})
}
export const startPaletteDrag = (event) => ( dispatch, getState ) => {
	dispatch( mouseAction('PALETTE_MOUSE_DOWN', event))
	const log = (e) => dispatch( changeShadeColor(e) )
	log(event)
	document.addEventListener("mousemove", log)
	document.addEventListener("mouseup", (e) => {
		document.removeEventListener("mousemove", log, false)
	})
}

export const changeRGBValue = (color, value) => {
	console.log(color, value)
	return {
	type: 'CHANGE_RGB_VALUE',
	color: color,
	value: value
}}
export const painterRegisterCanvas = context => ({
	type: 'PAINTER_REG_CANVAS',
	context: context
})
export const ribbonRegisterCanvas = context => ({
	type: 'RIBBON_REG_CANVAS',
	context: context
})
export const paletteRegisterCanvas = context => ({
	type: 'PALETTE_REG_CANVAS',
	context: context
})

export const changeFocus = (to) => ({
	type: 'CHANGE_FOCUS', to: to
})

export const selectTool = tool => ({
	type: 'SELECT_TOOL',
	tool: tool
})
