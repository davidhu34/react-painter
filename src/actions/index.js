export const Add = () => ({
    type: 'ADD'
})

const mouseAction = type => ( event, tool ) => ({ type, event, tool })

export const mouseActions = {
    down: mouseAction('MOUSE_DOWN'),
    move: mouseAction('MOUSE_MOVE'),
    up: mouseAction('MOUSE_UP')
}

export const registerCanvas = ctx => ({
    type: 'REG_CANVAS',
    context: ctx
})
