const getCoordinate = ( canvas, e ) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
})

export const mouseEvent = ( contextState, action ) => {
    const { context, saves, points, config } = contextState
    const { type, event, tool } = action

    const fillColor = context.fillStyle
    const strokeColor = context.strokeStyle
    const size = context.lineWidth
    const canvas = context.canvas

    const { x, y } = getCoordinate( context.canvas, event )


    //context.clearRect(0, 0, canvas.width, canvas.height)
    let lastSave
    if (saves.length > 0) {
        lastSave = new Image()
        lastSave.src = saves[saves.length-1]
        context.drawImage(lastSave, 0, 0)
        console.log(lastSave)
    }

    switch (tool) {
        case 'pen':
        default:
            const newPoints = [ ...points, { x, y }]
            switch ( type ) {
                case 'MOUSE_DOWN':
                    context.beginPath()
                    context.arc(x, y, size/2, 0, 2*Math.PI, false)
                    context.fillStyle = strokeColor
                    context.fill()
                    context.closePath()
                    context.fillStyle = fillColor
                    return {
                        ...contextState,
                        points: newPoints
                    }
                case 'MOUSE_MOVE':
                    context.beginPath()
                    context.moveTo( newPoints[0].x, newPoints[0].y )
                    for (let i = 0; i < newPoints.length; i++)
                        context.lineTo( newPoints[i].x, newPoints[i].y)
                    context.stroke()
                    context.closePath()
                    return {
                        ...contextState,
                        points: newPoints
                    }
                case 'MOUSE_UP':
                    context.beginPath()
                    context.moveTo( newPoints[0].x, newPoints[0].y )
                    for (let i = 1; i < newPoints.length; i++)
                        context.lineTo( newPoints[i].x, newPoints[i].y)
                    context.stroke()
                    context.closePath()
                    const window = 1
                    console.log(window)
                    console.log(stop)
                    return {
                        ...contextState,
                        points: [],
                        saves: [...saves, canvas.toDataURL()]
                    }
/*                case 'MOUSE_OUT':   // while isDrawing
                    context.closePath()
                    break
                case 'MOUSE_ENTER': // while isDrawing
                    context.beginPath()
                    context.moveTo(x,y)
                    break
*/
                default:
            }
    }
}
