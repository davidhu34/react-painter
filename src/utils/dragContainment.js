export default ( ctx, e ) => {
	const x = e.pageX
	const y = e.pageY
	const { width, height } = ctx.canvas
	const x0 = ctx.canvas.offsetLeft
	const y0 = ctx.canvas.offsetTop
	const containX
		= ( x < x0 )? x0
		: ( x < x0 + width - 1)? x
		:  (x0 + width - 1)
	const containY
		= ( y < y0 )? y0
		: ( y < y0 + height - 1)? y
		: y0 + height - 1
	return {
		x: containX - x0,
		y: containY - y0
	}
}
