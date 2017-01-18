export const Add = () => ({
    type: 'ADD'
})

const mouseAction = type =>
    ( ctx, e ) => ({
        type: type,
        context: ctx,
        event: e
    })

export const mouseActions = {
    down: mouseAction('MOUSE_DOWN'),
    move: mouseAction('MOUSE_MOVE'),
    up: mouseAction('MOUSE_UP')
}
