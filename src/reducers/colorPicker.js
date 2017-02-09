import draw from '../utils/cpDrawUtils'
import dragContainment from '../utils/dragContainment'
import Color from 'color'

const pickColor = (pctx, pos) =>
	Color.rgb(...pctx.getImageData(pos.x, pos.y, 1, 1).data)

export default ( state, action ) => {
	const { ribbon, palette } = state
	const { r_width, r_height } = ribbon
	const { p_width, p_height } = palette
	const r_context = ribbon.context
	const p_context = palette.context
	const r_position = ribbon.position
	const p_position = palette.position

	switch ( action.type ) {
		case 'CHANGE_BASE_COLOR': {
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
			const { x, y } = dragContainment( p_context, action.event )
			context.clearRect(0, 0, p_width, p_height)
			context.putImageData(palette.background, 0, 0)
			
			utils.drawPalettePoint(p_context)( x, y )

			return {
				...colorPicker,
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
			return {
				...state,
				ribbon: {
					...ribbon,
					context: ctx,
					background: ctx.getImageData(0, 0, r_width, r_height)
				}
			}
		}
		case 'PALETTE_REG_CANVAS': {
			const ctx = action.context
			ctx.strokeStyle = '#ffffff'
			ctx.lineWidth = 2
			draw.changePalette(ctx)(Color('blue'))
			draw.palettePoint(ctx)(p_position)
			return {
				...state,
				palette: {
					...palette,
					context: ctx,
					background: ctx.getImageData(0, 0, p_width, p_height)
				}
			}
		}
		default:
			return state
	}
}