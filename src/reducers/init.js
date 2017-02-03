const initPainter = {
	width: 500,
	height: 500,
	style: {
		border: '2px solid black'
	},
	isDown: false,
	context: null
}
const initRibbon = {
	width: 50,
	height: 200,
	style: {
		border: '2px solid black'
	},
	vertical: true,
	isDown: false,
	context: null,
	background: null
}
const initPalette = {
	width: 200,
	height: 200,
	style: {
		border: '2px solid black'
	},
	isDown: false,
	context: null,
	background: null
}

export const initState = {
	isDown: false,
	tool: 'pen',
	strokeColor: '#0dd00f',
	fillColor: '#00000f',
	saves: [],
	points: [],
	color: null,
	painter: initPainter,
	colorPicker: {
		ribbon: initRibbon,
		palette: initPalette
	}
}

export const initContext = ( state, action ) => {
	const ctx = action.context
	switch ( action.type ) {
		case 'PAINTER_REG_CANVAS': {
			ctx.strokeStyle = '#0dd00f'
			ctx.fillStyle = '#00000f'
			ctx.lineWidth = 15
			ctx.lineJoin = 'round'
			ctx.lineCap = 'round'
			return {
				...state,
				context: ctx
			}
		}
		case 'RIBBON_REG_CANVAS': {
			const ribbon = state.ribbon
			const { width, height } = state.ribbon
			const gradient = ctx.createLinearGradient(0, 0, 0, height)
			gradient.addColorStop(0, 'rgb(255, 0, 0)') // red
			gradient.addColorStop(0.17, 'rgb(255, 255, 0)') // yellow
			gradient.addColorStop(0.34, 'rgb(0, 255, 0)') // green
			gradient.addColorStop(0.51, 'rgb(0, 255, 255)') // aqua
			gradient.addColorStop(0.68, 'rgb(0, 0, 255)') // blue
			gradient.addColorStop(0.85, 'rgb(255, 0, 255)') // magenta
			gradient.addColorStop(1, 'rgb(255, 0, 0)') // red
			ctx.fillStyle = gradient
			ctx.fillRect(0, 0, width, height)
			ctx.strokeStyle = '#ffffff'
			ctx.lineWidth = 2
			return {
				...state,
				ribbon: {
					...ribbon,
					context: ctx,
					background: ctx.getImageData(0, 0, width, height)
				}
			}
		}
		case 'PALETTE_REG_CANVAS': {
			const palette = state.palette
			const { width, height } = state.palette
			ctx.fillStyle = 'blue'
			ctx.fillRect(0, 0, width, height)
			const whiteGrad = ctx.createLinearGradient(0, 0, width, 0)
			whiteGrad.addColorStop(0, 'rgb(255,255,255)')
			whiteGrad.addColorStop(1, 'transparent')
			ctx.fillStyle = whiteGrad
			ctx.fillRect(0, 0, width, height)
			const blackGrad = ctx.createLinearGradient(0, 0, 0, height)
			blackGrad.addColorStop(0, 'transparent')
			blackGrad.addColorStop(1, 'rgb(0,0,0)')
			ctx.fillStyle = blackGrad
			ctx.fillRect(0, 0, width, height)
			ctx.strokeStyle = '#ffffff'
			ctx.lineWidth = 2
			return {
				...state,
				palette: {
					...palette,
					context: ctx,
					background: ctx.getImageData(0, 0, width, height)
				}
			}
		}
		default:
			return state
	}
}
