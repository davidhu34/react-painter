import { mouseEvent } from '../canvas/eventHandler'

const defaultContextConfig = {
    lineWidth: 6,
    strokeStyle: '#00000f',
    fillStyle: '#00000f'
}
const initCanvas = {
    border: '2px solid black',
    isDrawing: false,
    tool: 'pen'
}
const initContext = null
const initContextConfig = ctx => {
    const { lineWidth, strokeStyle, fillStyle } = defaultContextConfig
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = strokeStyle
    ctx.fillStyle = fillStyle
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
    return ctx
}

export const context = ( state = initContext, action ) => {
    switch ( action.type ) {
        case 'REG_CANVAS':
            const ctx = action.context
            return initContextConfig(ctx)
        case 'MOUSE_DOWN':
        case 'MOUSE_MOVE':
        case 'MOUSE_UP':
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
