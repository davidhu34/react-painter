import { mouseEvent } from '../canvas/eventHandler'

const initCanvas = {
    mouse: 'up',
    border: '2px solid black',
    tool: 'pen',
    size: 6,
    strokeColor: '#00000f',
    fillColor: '#00000f',
    context: null
}

const canvas = ( state = initCanvas, action ) => {
    switch ( action.type ) {
        case 'REG_CANVAS':
            return {
                ...state,
                context: action.context
            }
        case 'MOUSE_DOWN':
            mouseEvent( state, action )
            return {
                ...state,
                mouse: 'down'
            }
        case 'MOUSE_MOVE':
            mouseEvent( state, action )
            return state
        case 'MOUSE_UP':
            mouseEvent( state, action )
            return {
                ...state,
                mouse: 'up'
            }
        default:
            return state
    }
}



export default canvas
