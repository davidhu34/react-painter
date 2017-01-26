const initColorPalette = {
    width: 200,
    height: 200,
    style: {border: '2px solid black'},
    isDown: false,
    context: null,
    config: {}
}
const initPaletteContext = ( ctx, w, h ) => {
    ctx.fillStyle = 'blue'
    ctx.fillRect(0, 0, w, h)
    const whiteGrad = ctx.createLinearGradient(0, 0, w, 0)
    whiteGrad.addColorStop(0, 'rgb(255,255,255)')
    whiteGrad.addColorStop(1, 'transparent')
    ctx.fillStyle = whiteGrad
    ctx.fillRect(0, 0, w, h)
    const blackGrad = ctx.createLinearGradient(0, 0, 0, h)
    blackGrad.addColorStop(0, 'transparent')
    blackGrad.addColorStop(1, 'rgb(0,0,0)')
    ctx.fillStyle = blackGrad
    ctx.fillRect(0, 0, w, h)
    return ctx
}

const colorPalette = ( state = initColorPalette, action ) => {
    switch ( action.type ) {
        case 'PALETTE_REG_CANVAS':
            const ctx = action.context
            const { width, height } = state
            return {
                ...state,
                context: initPaletteContext(ctx, width, height)
            }
        default:
            return state
    }
}

export default colorPalette
