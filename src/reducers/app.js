//import { painterEvent, changeBaseColor, changeShadeColor } from './mouseEvents'
import ColorPicker from './colorPicker'
import { painterEvent, painterInit } from './painter'
import { initState, initContext } from './init'

const painter = ( state = initState, action ) => {
	const { painter, colorPicker } = state
	switch ( action.type ) {
		// register canvas
		case 'PAINTER_REG_CANVAS':
			const painterState = painterInit(painter, action)
			painterState.context.strokeStyle = colorPicker.color.rgb()
			return {
				...state,
				painter: painterState
			}
		case 'PAINTER_MOUSE_DOWN':
		case 'PAINTER_MOUSE_MOVE':
		case 'PAINTER_MOUSE_UP':
			return {
				...state,
				painter: painterEvent( painter,
					{ ...action, tool:state.tool }
				)
			}
		case 'RIBBON_REG_CANVAS':
		case 'PALETTE_REG_CANVAS':
			return {
				...state,
				colorPicker: ColorPicker(colorPicker, action)
			}
		case 'CHANGE_BASE_COLOR':
		case 'CHANGE_SHADE_COLOR':
			const newColorPicker = ColorPicker(colorPicker, action)
			state.painter.context.strokeStyle = newColorPicker.color.rgb()
			return {
				...state,
				colorPicker: newColorPicker
			}
		// selections
		case 'SELECT_TOOL':
			return {
				...state,
				tool: action.tool
			}
		default:
			return state
	}
}

export default painter
