const getCoordinate = ( canvas, e ) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
})

const newSaves = (ctx, saves) => {
    const imgs = [ctx.getImageData(0,0,600,600), ...saves]
    return saves.length < 10 ?
        imgs : imgs.slice(0,10)
}


const bindUtils = context => ({
    drawDot: (x, y) => {
        const strokeColor = context.strokeStyle
        const fillColor = context.fillStyle
        context.beginPath()
        context.arc(x, y, context.lineWidth/2, 0, 2*Math.PI, false)
        context.fillStyle = strokeColor
        context.fill()
        context.closePath()
        context.fillStyle = fillColor
    },
    drawLine: (x, y, points) => {
        context.beginPath()
        context.moveTo( points[0].x, points[0].y )
        for (let i = 0; i < points.length; i++)
            context.lineTo( points[i].x, points[i].y)
        context.stroke()
        context.closePath()
    },
    drawSquare: ( x, y, points ) => {
        const x0 = points[0].x
        const y0 = points[0].y
        context.beginPath()
        context.moveTo(x0, y0)
        context.lineTo(x,y0)
        context.lineTo(x,y)
        context.lineTo(x0,y)
        context.lineTo(x0,y0)
        context.stroke()
        context.closePath()
    }
})

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


    const utils = bindUtils(context)
    switch (tool) {
        case 'square':
            switch (type) {
                case 'MOUSE_DOWN':
                    utils.drawDot(x,y)
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawSquare(x, y,points)
                    return contextState
                case 'MOUSE_UP':
                    utils.drawSquare(x, y, points)
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end line
        case 'line':
            switch (type) {
                case 'MOUSE_DOWN':
                    utils.drawDot(x,y)
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawLine(x, y, [...points, {x, y}])
                    return contextState
                case 'MOUSE_UP':
                    utils.drawLine(x, y, [...points, {x, y}])
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end line
        case 'pen':
        default:
            const newPoints = [ ...points, { x, y }]
            switch (type) {
                case 'MOUSE_DOWN':
                    utils.drawDot(x,y)
                    return {
                        ...contextState,
                        points: newPoints
                    }
                case 'MOUSE_MOVE':
                    utils.drawLine(x, y, newPoints)
                    return {
                        ...contextState,
                        points: newPoints
                    }
                case 'MOUSE_UP':
                    utils.drawLine(x, y, newPoints)
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end pen
    }
}
