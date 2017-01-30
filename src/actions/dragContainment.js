const dragContainment = ( mouse, ctx ) => {
	const { x, y } = mouse
	const { width, height } = ctx
	const x0 = ctx.canvas.offsetLeft
	const y0 = ctx.canvas.offsetTop
	const containX
		= (!x)? null
		: ( x < x0 )? x0
		: ( x < x0 + width )? x
		:  x0 + width
	const containY
		= (!y)?
		: ( y < x0 )? y0
		: ( y < y0 + height )? y
		: y0 + height
	return {
		x: containX - x0,
		y: containY - y0
	}
}
