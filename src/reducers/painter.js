import { painterEvent } from './mouseEvents'
import { initState, initContext } from './init'

const painter = ( state = initState, action ) => {
    const { painter, colorPicker } = state
    switch ( action.type ) {
        case 'PAINTER_REG_CANVAS':
            return {
                ...state,
                painter: initContext(painter, action)
            }
        case 'RIBBON_REG_CANVAS':
        case 'PALETTE_REG_CANVAS':
            return {
                ...state,
                colorPicker:
                    initContext(colorPicker, action)
            }
        case 'PAINTER_MOUSE_DOWN':
            return painterEvent({
                ...state,
                painter: {
                    ...painter,
                    isDown: true
                }
            }, action )
        case 'PAINTER_MOUSE_MOVE':
            return painterEvent( state, action )
        case 'PAINTER_MOUSE_UP':
            return painterEvent({
                ...state,
                painter: {
                    ...painter,
                    isDown: false
                }
            }, action )
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
