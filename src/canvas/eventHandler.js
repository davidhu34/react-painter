const getCoordinate = ( canvas, e ) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
})

export const mouseEvent = ( config, action ) => {
    const { type, event } = action
    const { context, tool, size, strokeColor, fillColor } = config
    const { x, y } = getCoordinate( context.canvas, event )

    if (tool === 'pen') {   // starting point
        context.beginPath()
		context.arc(x, y, size/2, 0, 2*Math.PI, false)
		context.fillStyle = strokeColor
		context.fill()
		context.closePath()
        //context.beginPath()
    }
    return context
}
