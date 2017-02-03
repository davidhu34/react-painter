export default ( ctx, e ) => {
	const x = e.pageX
	const y = e.pageY
	const { width, height } = ctx.canvas
	const x0 = ctx.canvas.offsetLeft
	const y0 = ctx.canvas.offsetTop
	console.log("origin", x0, y0)
	console.log("mouse", x, y)
	console.log("WH", width, height)
	console.log("1st", x<x0+width)
	const containX
		= ( x < x0 )? x0
		: ( x < x0 + width )? x
		:  (x0 + width)
	const containY
		= ( y < x0 )? y0
		: ( y < y0 + height )? y
		: y0 + height
	console.log("cnotatin",containX, containY)
	return {
		x: containX - x0,
		y: containY - y0
	}
}
