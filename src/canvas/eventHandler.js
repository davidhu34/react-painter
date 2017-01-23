const getCoordinate = ( canvas, e ) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
})

const newSaves = (ctx, saves) => {
    const imgs = [ctx.getImageData(0,0,600,600), ...saves]
    return saves.length < 10 ?
        imgs : imgs.slice(0,10)
}

export const mouseEvent = ( contextState, action ) => {
    const { context, saves, points, config } = contextState
    const { type, event, tool } = action

    const fillColor = context.fillStyle
    const strokeColor = context.strokeStyle
    const size = context.lineWidth
    const canvas = context.canvas

    const { x, y } = getCoordinate( context.canvas, event )

    context.clearRect(0, 0, canvas.width, canvas.height)
    const lastSave = saves.length > 0 ?
        saves[0] : null
    if (lastSave) context.putImageData(lastSave,0,0)
    /*if (saves.length > 0) {
        lastSave = new Image()
        context.drawImage(lastSave, 0, 0)
        lastSave.src = saves[saves.length-1]
        console.log(lastSave)
    }*/

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
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
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
