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
/*export const painterMouseActions = dispatch =>
    mouseActions('PAINTER_', dispatch)
export const ribbonMouseActions = dispatch =>
    mouseActions('RIBBON_', dispatch)
export const paletteMouseActions = dispatch =>
    mouseActions('PALETTE_', dispatch)
*/
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
        = mouseActions('RIBBON_', dispatch)
    if (isDown)
        onMouseDown = null
    else
        onMouseMove = onMouseUp = null
    onMouseOut = onMouseUp
    onMouseEnter = null
    return { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
}
export const paletteMouseActions = dispatch => isDown => {
    let { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
        = mouseActions('PALETTE_', dispatch)
    if (isDown)
        onMouseDown = null
    else
        onMouseMove = onMouseUp = null
    onMouseOut = onMouseUp
    onMouseEnter = null
    return { onMouseDown, onMouseMove, onMouseUp, onMouseOut, onMouseEnter }
}


export const startDrag = (event) => ( dispatch, getState ) => {
    const log =  (e) => {
        console.log(e.pageY)
        //dispatch( changeBaseColor(y) )
        //dispatch( chooseColor)
    }
    document.addEventListener("mousemove", log)
    document.addEventListener("mouseup", (e) => {
        document.removeEventListener("mousemove",log, false)
    })
}

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
