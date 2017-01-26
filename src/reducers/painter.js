import { mouseEvent } from '../canvas/eventHandler'

const initPainter = {
    style: {border: '2px solid black'},
    isDown: false,
    tool: 'pen',
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

const painter = ( state = initPainter, action ) => {
    switch ( action.type ) {
        case 'PAINTER_REG_CANVAS':
            const ctx = action.context
            return {
                ...state,
                context: initContextConfig(ctx)
            }
        case 'PAINTER_MOUSE_DOWN':
            return mouseEvent({
                ...state,
                isDown: true
            }, action )
        case 'PAINTER_MOUSE_MOVE':
            return mouseEvent( state, action )
        case 'PAINTER_MOUSE_UP':
            return mouseEvent({
                ...state,
                isDown: false
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
