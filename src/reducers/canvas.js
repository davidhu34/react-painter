import { mouseEvent } from '../canvas/eventHandler'

const initCanvas = {
    border: '2px solid black',
    isDrawing: false,
    tool: 'pen'
}
const initContext = {
    context: null,
    saves: [],
    points: [],
    config: {
        strokeStyle: '#00000f',
        fillStyle: '#00000f',
        lineWidth: 15,
        lineJoin: 'round',
        lineCap: 'round'
    }
}
const initContextConfig = ctx => {
    ctx.strokeStyle = '#0dd00f'
    ctx.fillStyle = '#00000f'
    ctx.lineWidth = 15
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    return ctx
}

export const context = ( state = initContext, action ) => {
    switch ( action.type ) {
        case 'REG_CANVAS':
            const ctx = action.context
            return {
                ...state,
                context: initContextConfig(ctx)
            }
        case 'MOUSE_DOWN':
        case 'MOUSE_MOVE':
        case 'MOUSE_UP':
        case 'MOUSE_ENTER':
        case 'MOUSE_OUT':
            return mouseEvent( state, action )
        default:
            return state
    }

}
export const canvas = ( state = initCanvas, action ) => {
    switch ( action.type ) {
        case 'MOUSE_DOWN':
            return {
                ...state,
                isDrawing: true,
            }
        case 'MOUSE_UP':
            return {
                ...state,
                isDrawing: false,
            }
        default:
            return state
    }
}
