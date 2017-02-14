export default ( r, g, b ) => {
	const rgb = [r,g,b]
	const sorted = rgb.sort( (a,b) => (a-b) )
	x = sorted[0]/sorted[2]
	y = sorted[0]/255
	if ( r g b )
		return {
			ribbonPos: (1/6) * (g/r),
			palettePos: {
				x:
				y:
			}
		}

	else if ( g r b )
	else if ( g b r )
	else if ( g b r )
	else if ( g b r )
	const offset
		= (r>=g && g>=b)? 0
		: (g>=r && r>=b)? 1/6
		: (g>=b && b>=r)? 2/6
		: (b>=g && g>=r)? 3/6
		: (b>=r && r>=g)? 4/6
		: 5/6

}