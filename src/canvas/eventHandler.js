const getCoordinate = ( canvas, e ) => ({
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop,
})

const newSaves = (ctx, saves) => {
    const imgs = [ctx.getImageData(0,0,600,600), ...saves]
    return saves.length < 10 ?
        imgs : imgs.slice(0,10)
}


const utils = ({
    drawDot: context =>
    (x, y) => {
        const strokeColor = context.strokeStyle
        const fillColor = context.fillStyle
        context.beginPath()
        context.arc(x, y, context.lineWidth/2, 0, 2*Math.PI, false)
        context.fillStyle = strokeColor
        context.fill()
        context.closePath()
        context.fillStyle = fillColor
    },
    drawLine: context =>
    ( x, y, points ) => {
        context.beginPath()
        context.moveTo( points[0].x, points[0].y )
        for (let i = 0; i < points.length; i++)
            context.lineTo( points[i].x, points[i].y)
        context.stroke()
        context.closePath()
    },
    drawRect: context =>
    ( x, y, point0 ) => {
        const x0 = point0.x
        const y0 = point0.y
        context.beginPath()
        context.moveTo(x0, y0)
        context.lineTo(x,y0)
        context.lineTo(x,y)
        context.lineTo(x0,y)
        context.lineTo(x0,y0)
        context.stroke()
        context.closePath()
    },
    drawSquare: context =>
    ( x, y, point0 ) => {
        const x0 = point0.x
        const y0 = point0.y
        const xd = x - x0
        const yd = y - y0
        const l = xd < yd ? Math.abs(xd) : Math.abs(yd)
        const lx =  x > x0 ? l : -l
        const ly =  y > y0 ? l : -l
        context.beginPath()
        context.moveTo(x0, y0)
        context.lineTo(x0+lx,y0)
        context.lineTo(x0+lx,y0+ly)
        context.lineTo(x0,y0+ly)
        context.lineTo(x0,y0)
        context.stroke()
        context.closePath()
    },
    drawCircle: context =>
    ( x, y, point0 ) => {
        const x0 = point0.x
        const y0 = point0.y
        const xd = x - x0
        const yd = y - y0
        const r = Math.abs(Math.abs(xd) < Math.abs(yd) ? xd/2 : yd/2)
        const xc = x0 < x ? (x0+r) : (x0-r)
        const yc = y0 < y ? (y0+r) : (y0-r)
        context.beginPath()
        context.arc(xc, yc, r, 0, 2*Math.PI, false)
        context.stroke()
        context.closePath()
    },
    drawOval: context =>
    ( x, y, point0 ) => {
        const x0 = point0.x
        const y0 = point0.y
        const x1 = Math.min(x0,x)
        const x2 = Math.max(x0,x)
        const y1 = Math.min(y,y0)
        const y2 = Math.max(y,y0)
        const xd = x2 - x1
        const yd = y2 - y1
        let r, rs
        context.save()
        if ( xd > yd ) {
            r = xd / 2
            rs = yd / xd
            context.translate(x1+xd/2, y1+yd/2)
            context.scale(1,rs)
        } else {
            r = yd / 2
            rs = xd / yd
            context.translate(x1+xd/2, y1+yd/2)
            context.scale(rs,1)
        }
        context.beginPath()
        context.arc( 0, 0, r, 0, 2*Math.PI, false);
        context.restore()
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


    switch (tool) {
        case 'oval':
            switch (type) {
                case 'MOUSE_DOWN':
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawOval(context)(x, y, points[0])
                    return contextState
                case 'MOUSE_UP':
                    utils.drawOval(context)(x, y, points[0])
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end oval
        case 'circle':
            switch (type) {
                case 'MOUSE_DOWN':
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawCircle(context)(x, y, points[0])
                    return contextState
                case 'MOUSE_UP':
                    utils.drawCircle(context)(x, y, points[0])
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end circle
        case 'rect':
            switch (type) {
                case 'MOUSE_DOWN':
                    utils.drawDot(x,y)
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawRect(context)(x, y, points[0])
                    return contextState
                case 'MOUSE_UP':
                    utils.drawRect(context)(x, y, points[0])
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end rect
        case 'square':
            switch (type) {
                case 'MOUSE_DOWN':
                    utils.drawDot(x,y)
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawSquare(context)(x, y, points[0])
                    return contextState
                case 'MOUSE_UP':
                    utils.drawSquare(context)(x, y, points[0])
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end square
        case 'line':
            switch (type) {
                case 'MOUSE_DOWN':
                    utils.drawDot(x,y)
                    return {
                        ...contextState,
                        points: [{x, y}]
                    }
                case 'MOUSE_MOVE':
                    utils.drawLine(context)(x, y, [...points, {x, y}])
                    return contextState
                case 'MOUSE_UP':
                    utils.drawLine(context)(x, y, [...points, {x, y}])
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
                    utils.drawDot(context)(x,y)
                    return {
                        ...contextState,
                        points: newPoints
                    }
                case 'MOUSE_MOVE':
                    utils.drawLine(context)(x, y, newPoints)
                    return {
                        ...contextState,
                        points: newPoints
                    }
                case 'MOUSE_UP':
                    utils.drawLine(context)(x, y, newPoints)
                default:
                    return {
                        ...contextState,
                        points: [],
                        saves: newSaves(context, saves)
                    }
            }   // end pen
    }
}
