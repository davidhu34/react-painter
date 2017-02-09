import draw from '../utils/cpDrawUtils'
import dragContainment from '../utils/dragContainment'
import Color from 'color'

const pickColor = (pctx, pos) =>
	Color.rgb(...pctx.getImageData(pos.x, pos.y, 1, 1).data)

export default ( state, action ) => {
	const { ribbon, palette } = state
	const r_context = ribbon.context
	const p_context = palette.context
	const r_position = ribbon.position
	const p_position = palette.position

	switch ( action.type ) {
		case 'CHANGE_BASE_COLOR': {
			const { r_width, r_height } = r_context.canvas
			const p_width=p_context.canvas.width, p_height = p_context.canvas.height
			const { x, y } = dragContainment( r_context, action.event )
			r_context.clearRect(0, 0, r_width, r_height)
			r_context.putImageData(ribbon.background, 0, 0)

			const newBaseColor = Color.rgb(...r_context.getImageData(x, y, 1,1).data)

			draw.changePalette(p_context)(newBaseColor)
			const newBackground = p_context.getImageData(0,0, p_width, p_height)
			
			draw.ribbonBar(r_context)( x, y, ribbon.vertical)
			draw.palettePoint(p_context)( p_position.x, p_position.y )

			return {
				...state,
				palette: {
					...palette,
					background: newBackground
				},
				ribbon: {
					...ribbon,
					position: {x, y}
				},
				color: pickColor(p_context, p_position)
			}
		}
		case 'CHANGE_SHADE_COLOR': {
			const { p_width, p_height } = p_context.canvas
			const { x, y } = dragContainment( p_context, action.event )
			p_context.clearRect(0, 0, p_width, p_height)
			p_context.putImageData(palette.background, 0, 0)
			
			draw.palettePoint(p_context)( x, y )

			return {
				...state,
				palette: {
					...palette,
					position: {x,y}
				},
				color: pickColor(p_context, {x,y})
			}
		}
		case 'RIBBON_REG_CANVAS': {
			const ctx = action.context
			ctx.strokeStyle = '#ffffff'
			ctx.lineWidth = 2
			draw.ribbon(ctx)(ribbon.vertical)
			const ribbonData = ctx.getImageData(0, 0, 50, 200)
			draw.ribbonBar(ctx)(r_position.x, r_position.y, ribbon.vertical)
			return {
				...state,
				ribbon: {
					...ribbon,
					context: ctx,
					background: ribbonData
				},
				color: pickColor(p_context, p_position)
			}
		}
		case 'PALETTE_REG_CANVAS': {
			const ctx = action.context
			ctx.strokeStyle = '#ffffff'
			ctx.lineWidth = 2
			draw.changePalette(ctx)(Color('blue'))
			const newBackground = ctx.getImageData(0, 0, 200, 200)
			draw.palettePoint(ctx)(p_position.x, p_position.y)
			return {
				...state,
				palette: {
					...palette,
					context: ctx,
					background: newBackground
				},
				color: pickColor(ctx, p_position)
			}
		}
		default:
			return state
	}
}