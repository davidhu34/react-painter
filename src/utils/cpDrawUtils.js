export default ({
	ribbonBar: context =>
	( x,y, vertical ) => {
		console.log("drawing")
		console.log(x, y)
		const { width, height } = context.canvas
		context.beginPath()
		if (vertical) {
			context.moveTo(0, y)
			context.lineTo(width, y)
			context.stroke()
		} else {
			context.beginPath()
			context.moveTo(x, 0)
			context.lineTo(x, height)
			context.stroke()
		}
		context.closePath()
	},
	palettePoint: context =>
	( x, y ) => {
		context.beginPath()
		context.arc(x, y, 5, 0, 2*Math.PI, false)
		context.stroke()
		context.closePath()
	},
	changePalette: context => 
	color => {
		const { width, height } = context.canvas
		const whiteGrad = context.createLinearGradient(0, 0, width, 0)
		const blackGrad = context.createLinearGradient(0, 0, 0, height)

		context.clearRect(0, 0, width, height)
		console.log(color.rgb())
		context.fillStyle = color.rgb()
		context.fillRect(0, 0, width, height)

		whiteGrad.addColorStop(0, 'rgb(255,255,255)')
		whiteGrad.addColorStop(1, 'transparent')
		context.fillStyle = whiteGrad
		context.fillRect(0, 0, width, height)

		blackGrad.addColorStop(0, 'transparent')
		blackGrad.addColorStop(1, 'rgb(0,0,0)')
		context.fillStyle = blackGrad
		context.fillRect(0, 0, width, height)

		context.fillStyle = color.rgb()
	},
	ribbon: context => 
	vertical => {
		const { width, height } = context.canvas
		const gradient = vertical?
			context.createLinearGradient(0, 0, 0, height)
			: context.createLinearGradient(0, 0, width, height)
		gradient.addColorStop(0, 'rgb(255, 0, 0)') // red
		gradient.addColorStop(0.17, 'rgb(255, 255, 0)') // yellow
		gradient.addColorStop(0.34, 'rgb(0, 255, 0)') // green
		gradient.addColorStop(0.51, 'rgb(0, 255, 255)') // aqua
		gradient.addColorStop(0.68, 'rgb(0, 0, 255)') // blue
		gradient.addColorStop(0.85, 'rgb(255, 0, 255)') // magenta
		gradient.addColorStop(1, 'rgb(255, 0, 0)') // red
		context.fillStyle = gradient
		context.fillRect(0, 0, width, height)
	}
})