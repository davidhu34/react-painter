const initColorRibbon = {
    width: 50,
    height: 200,
    style: {border: '2px solid black'},
    isDown: false,
    context: null,
    config: {}
}
const initRibbonContext = ( ctx, w, h ) => {
    const gradient = ctx.createLinearGradient(0,0,0,h)
    gradient.addColorStop(0, 'rgb(255, 0, 0)'); // red
    gradient.addColorStop(0.17, 'rgb(255, 255, 0)'); // yellow
    gradient.addColorStop(0.34, 'rgb(0, 255, 0)'); // green
    gradient.addColorStop(0.51, 'rgb(0, 255, 255)'); // aqua
    gradient.addColorStop(0.68, 'rgb(0, 0, 255)'); // blue
    gradient.addColorStop(0.85, 'rgb(255, 0, 255)'); // magenta
    gradient.addColorStop(1, 'rgb(255, 0, 0)'); // red
    ctx.fillStyle = gradient
    ctx.fillRect(0,0, w, h)
    return ctx
}

const colorRibbon = ( state = initColorRibbon, action ) => {
    switch ( action.type ) {
        case 'RIBBON_REG_CANVAS':
            const ctx = action.context
            const { width, height } = state
            return {
                ...state,
                context: initRibbonContext(ctx, width, height)
            }
        default:
            return state
    }
}

export default colorRibbon
