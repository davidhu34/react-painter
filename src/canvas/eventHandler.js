const getCoordinate = ( canvas, e ) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
})

export const mouseEvent = ( context, action ) => {
    const fillColor = context.fillStyle
    const strokeColor = context.strokeStyle
    const size = context.lineWidth
    const { type, event, tool } = action
    const { x, y } = getCoordinate( context.canvas, event )

    switch (tool) {
        case 'pen':
        default:
            switch ( type ) {
                case 'MOUSE_DOWN':
                    context.beginPath()
                    context.arc(x, y, size/2, 0, 2*Math.PI, false)
                    context.fillStyle = strokeColor
                    context.fill()
                    context.closePath()
                    context.fillStyle = fillColor
                    context.beginPath()
                    break
                case 'MOUSE_MOVE':
                    context.lineTo(x,y)
                    context.stroke()
                    break
                case 'MOUSE_UP':
                    context.closePath()
                    context.beginPath()
                    context.arc(x, y, size/2, 0, 2*Math.PI, false)
                    context.fill()
                    context.closePath()
                    break
                default:
            } return context
    }
}
