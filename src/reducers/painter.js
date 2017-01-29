import { painterEvent } from './mouseEvents'
import { initState, initContext } from './init'

const painter = ( state = initState, action ) => {
    const { painter, colorPicker } = state
    const ribbon = colorPicker.ribbon
    switch ( action.type ) {
        // register canvas
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
        // painter mouse actions
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
       /*case 'RIBBON_MOUSE_DOWN':
            return {
                ...state
                colorPicker: {
                    ...colorPicker,
                    ribbon: {
                        ...ribbon,
                        isDown: true
                    }
                }
            }
        case 'RIBBON_MOUSE_UP':
             return {
                 ...state
                 colorPicker: {
                     ...colorPicker,
                     ribbon: {
                         ...ribbon,
                         isDown: false
                     }
                 }
             }*/
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
