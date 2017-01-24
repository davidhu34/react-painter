export const Add = () => ({
    type: 'ADD'
})

const mouseAction = type => ( event, tool ) => ({ type, event, tool })

export const mouseActions = {
    down: mouseAction('MOUSE_DOWN'),
    move: mouseAction('MOUSE_MOVE'),
    up: mouseAction('MOUSE_UP'),
    out: mouseAction('MOUSE_OUT'),
    enter: mouseAction('MOUSE_ENTER')
}

export const registerCanvas = ctx => ({
    type: 'REG_CANVAS',
    context: ctx
})

export const selectTool = tool => ({
    type: 'SELECT_TOOL',
    tool: tool
})
