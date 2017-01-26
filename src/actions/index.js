export const Add = () => ({
    type: 'ADD'
})

const mouseAction = (type, event) => ({ type, event })
const mouseActions = (upon, dispatch) => ({
    down : (e) => dispatch(mouseAction(upon+'MOUSE_DOWN', e)),
    move: (e) => dispatch(mouseAction(upon+'MOUSE_MOVE', e)),
    up: (e) => dispatch(mouseAction(upon+'MOUSE_UP', e)),
    out: (e) => dispatch(mouseAction(upon+'MOUSE_OUT', e)),
    enter: (e) => dispatch(mouseAction(upon+'MOUSE_ENTER', e))
})
export const painterMouseActions = dispatch =>
    mouseActions('PAINTER_', dispatch)
export const ribbonMouseActions = dispatch =>
    mouseActions('RIBBON_', dispatch)
export const paletteMouseActions = dispatch =>
    mouseActions('PALETTE_', dispatch)

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


export const selectTool = tool => ({
    type: 'SELECT_TOOL',
    tool: tool
})
